from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Post, PostTemplate
from .serializers import PostSerializer, PostTemplateSerializer


class WorkspacePostListCreateView(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not (workspace_id := self.kwargs.get('workspace_id')):
            raise ValidationError("workspace_id is required")

        return Post.objects.filter(workspace_id=workspace_id, workspace__members__in=(self.request.user,))


class PostRetrieveDeleteView(RetrieveDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(workspace__members__in=(self.request.user,))


class WorkspacePostTemplateListCreateView(ListCreateAPIView):
    serializer_class = PostTemplateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not (workspace_id := self.kwargs.get('workspace_id')):
            raise ValidationError("workspace_id is required")

        return PostTemplate.objects.filter(workspace_id=workspace_id, workspace__members__in=(self.request.user,))

class PostTemplateRetrieveDeleteView(RetrieveDestroyAPIView):
    serializer_class = PostTemplateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(workspace__members__in=(self.request.user,))
