from django.urls import path
from rest_framework import permissions
from .views import *

urlpatterns = [
   path('workspace', WorkSpaceListCreate.as_view()),
   path("workspace/<int:pk>", WorkSpaceRetrieveView.as_view())
]