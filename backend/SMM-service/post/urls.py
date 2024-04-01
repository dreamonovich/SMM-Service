from django.urls import path
from .views import RUDPost


urlpatterns = [
    path("post/<int:pk>", RUDPost.as_view())
]
