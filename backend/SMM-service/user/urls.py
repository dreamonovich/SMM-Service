from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import register_user, authenticate_user

urlpatterns = [
    path('auth/register/', register_user, name='register_user'),
    path('auth/login/', authenticate_user, name='authenticate_user'),
]
