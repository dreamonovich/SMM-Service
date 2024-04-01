from django.urls import path
from .views import *

urlpatterns = [
    path("post/<int:pk>", PostRetrieveDeleteView.as_view()),
    path("workspace/<int:workspace_id>/post", WorkspacePostListCreateView.as_view()),
    path("postTemplate/<int:pk>", PostTemplateRetrieveDeleteView.as_view()),
    path("workspace/<int:workspace_id>/postTemplate", WorkspacePostTemplateListCreateView.as_view()),
]