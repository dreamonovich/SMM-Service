from django.db import models


class Channel(models.Model):
    name = models.CharField(max_length=32)
    chat_id = models.BigIntegerField()
    is_group = models.BooleanField(default=False)
    workspace = models.ForeignKey("workspace.Workspace", on_delete=models.CASCADE)
    channel_username = models.CharField(max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class ChannelRequest(models.Model):
    chat_id = models.BigIntegerField()
    message_id = models.BigIntegerField()
    is_group = models.BooleanField(default=False)
    code = models.IntegerField()
    channel_username = models.CharField(max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

