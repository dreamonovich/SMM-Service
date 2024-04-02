from django.urls import path
from channel.views import *


urlpatterns = [
    path("channel/<int:pk>", RetrieveUpdateDestroyChannel.as_view())
]