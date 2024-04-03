from django.urls import path
from analytics.views import AnalyticsWorkspaceChannels

urlpatterns = [
    path('workspace/<int:workspace_id>/analytics/', AnalyticsWorkspaceChannels.as_view(), name='workspace/analytics/'),
]
