from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser


class User(AbstractBaseUser):
    name = models.CharField(max_length=64)
    telegram_id = models.BigIntegerField(unique=True)
    telegram_username = models.CharField(max_length=32)
    avatar_path = models.FilePathField(default="https://ui.shadcn.com/avatars/03.png")
    last_logged_in = models.DateTimeField(default=timezone.now, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    password = None
    last_login = None
    is_superuser = None
    username = None
    first_name = None
    last_name = None
    email = None
    is_staff = None
    is_active = True
    date_joined = None

    USERNAME_FIELD = 'telegram_id'
    REQUIRED_FIELDS = ['name', 'telegram_username']

