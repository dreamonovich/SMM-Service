from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer


class PostListCreate(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "workspace_id"

