from django.urls import path
from .views import *

urlpatterns = [
   path('auth/register/', register_user, name='register_user'),
   path('auth/login/', authenticate_user, name='authenticate_user'),
]