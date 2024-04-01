from django.urls import path
from .views import *
from channel.views import ChannelListCreate

urlpatterns = [
   path('workspace', WorkSpaceListCreate.as_view()),
   path("workspace/<int:pk>", WorkSpaceRetrieveView.as_view()),
   path("workspace/<int:workspace_id>/channels", ChannelListCreate.as_view()),
]