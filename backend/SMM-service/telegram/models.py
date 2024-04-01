from channel.models import Channel
from django.db import models
from post.models import Post


class TelegramPost(models.Model):
    STATUS = [
        ("p", "pending"),
        ("r", "running"),
        ("s", "sended"),
        ("f", "failed"),
    ]

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    telegram_channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    posted_at = models.DateTimeField(null=True, default=None)

    status = models.CharField(max_length=3, choices=STATUS, default="pending")
    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class TelegramApproval(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    telegram_id = models.BigIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)


class TelegramDisapproval(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    telegram_id = models.BigIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
