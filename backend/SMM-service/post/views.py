from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, DestroyAPIView, APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

import json

from .models import Post, PostFile, PostPhoto
from .serializers import PostSerializer, PostCreateFileSerializer, PostCreatePhotoSerializer

from telegram.tasks import send_telegram_post
from datetime import timedelta

class WorkspacePostListCreateView(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not (workspace_id := self.kwargs.get('workspace_id')):
            raise ValidationError("workspace_id is required")

        return Post.objects.filter(workspace_id=workspace_id, workspace__members__in=(self.request.user,))


class PostRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(workspace__members__in=(self.request.user,))


class PostMediaCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if not (media_type := self.request.data.get('type')):
            raise ValidationError("type required")

        if media_type == "files":
            return PostCreateFileSerializer
        elif media_type == "photos":
            return PostCreatePhotoSerializer

        raise ValidationError("type invalid")


class PostMediaDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not (media_type := self.request.data.get('type')):
            raise ValidationError('type required')

        if media_type == "files":
            return PostFile.objects.filter(post__workspace__members__in=(self.request.user,))
        elif media_type == "photos":
            return PostPhoto.objects.filter(post__workspace__members__in=(self.request.user,))

        raise ValidationError('type not valid')

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)

        return Response({})

class CreateTaskView(APIView):
    def post(self, request):
        if not (post_id := request.POST.get('post_id')):
            raise ValidationError("post_id required")

        try:
            post = Post.objects.get(pk=post_id)
            send_planned_at = post.send_planned_at

            channels = post.workspace.channels.all()
            channel_ids = [channel.chat_id for channel in channels]

            for channel_id in channel_ids:
                send_telegram_post.apply_async((channel_id,), eta=send_planned_at - timedelta(hours=3))

        except ObjectDoesNotExist:
            return JsonResponse({'error': f'post: {post_id} does not exist'}, status=404)