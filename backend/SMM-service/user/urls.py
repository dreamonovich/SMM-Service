from django.urls import path
from user.views import register_user, authenticate_user,RetrieveUpdateDestroyUser

urlpatterns = [
    path('auth/register/', register_user, name='register_user'),
    path('auth/login/', authenticate_user, name='authenticate_user'),
    path("me",RetrieveUpdateDestroyUser.as_view(),name='RetrieveUpdateDestroyUser'),
]
