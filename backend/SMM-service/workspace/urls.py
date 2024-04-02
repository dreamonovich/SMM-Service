from django.urls import path
from .views import *
from channel.views import ChannelListCreate
from post.views import WorkspacePostListCreateView

urlpatterns = [
   path('workspace', WorkSpaceListCreate.as_view()),
   path("workspace/<int:pk>", WorkSpaceRetrieveDeleteView.as_view()),
   path("workspace/<int:workspace_id>/channels", ChannelListCreate.as_view()),
   path("workspace/<int:workspace_id>/posts", WorkspacePostListCreateView.as_view()),
   path("workspace/<int:pk>/members", WorkSpaceMembers.as_view()),
   path("workspace/<int:workspace_id>/invitelink", get_invite_link),
   path("workspace/join/<str:token>", join_workspace),
   path("workspace/<int:workspace_id>/leave", WorkSpaceLeave.as_view()),
   path("workspace/<int:workspace_id>/remove_member/<int:user_id>", WorkSpaceRemoveMember.as_view()),
   path("workspace/invitelink_info/<str:token>", get_invite_info)
]
