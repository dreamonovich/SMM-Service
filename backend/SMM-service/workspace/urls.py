from django.urls import path
from .views import *
from channel.views import ChannelListCreate
from post.views import PostListCreate

urlpatterns = [
   path('workspace', WorkSpaceListCreate.as_view()),
   path("workspace/<int:pk>", WorkSpaceRetrieveView.as_view()),
   path("workspace/<int:workspace_id>/channels", ChannelListCreate.as_view()),
   path("workspace/<int:workspace_id>/posts", PostListCreate.as_view()),
   path("workspace/<int:workspace_id>/members", WorkSpaceMembers.as_view()),
]
