from django.urls import path
from .views import *

urlpatterns = [
   path("post/<int:pk>", PostRetrieveUpdateDeleteView.as_view()),
   path("workspace/<int:workspace_id>/post", WorkspacePostListCreateView.as_view()),

   path("post/<int:post_id>/media", PostMediaCreateView.as_view()),
   path("post/media/<int:pk>", PostMediaDeleteView.as_view()),

   path("post/task/<int:post_id>", CreateTaskView.as_view())
]