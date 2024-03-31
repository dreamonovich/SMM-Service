from django.db import models

from user.models import User
from channel.models import Channel

class Workspace(models.Model):
    name = models.CharField(max_length=32)
    members = models.ManyToManyField(User)
    creator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_workspaces')
    channels = models.ManyToManyField(Channel)
    created_at = models.DateTimeField(auto_now_add=True)