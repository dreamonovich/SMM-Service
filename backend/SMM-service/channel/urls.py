from django.urls import path
from .views import *


urlpatterns = [
    path("channel/<int:pk>", RetrieveUpdateDestroyChannel.as_view())
]