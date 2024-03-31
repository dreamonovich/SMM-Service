from django.db import models


class User(models.Model):
    name = models.CharField(max_length=64)
    telegram_id = models.BigIntegerField(unique=True)
    telegram_username = models.CharField(max_length=32)
    avatar_path = models.FilePathField()
    last_logged_in = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)