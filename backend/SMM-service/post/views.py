from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Post, PostTemplate
from .serializers import PostSerializer, PostTemplateSerializer


class PostListCreate(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "workspace_id"


class RUDPost(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)


class PostTemplateListCreate(ListAPIView):
    queryset = PostTemplate.objects.all()
    serializer_class = PostTemplateSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "workspace_id"

class RUDPostTemplate(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostTemplateSerializer
    permission_classes = (IsAuthenticated,)
