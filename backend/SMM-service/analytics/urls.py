from django.urls import path
from analytics.views import WorkspaceChannels

urlpatterns = [
    path('analytics/workspace/<int:workspace_id>/', WorkspaceChannels.as_view(), name='workspace_channels'),
]
