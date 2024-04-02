from django.urls import path
from analytics.views import WorkspaceChannels

urlpatterns = [
    path('workspace/<int:workspace_id>/channels/', WorkspaceChannels.as_view(), name='workspace_channels'),
]
