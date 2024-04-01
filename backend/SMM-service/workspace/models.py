from channel.models import Channel
from django.db import models
from user.models import User
from uuid import uuid4


class Workspace(models.Model):
    name = models.CharField(max_length=32)
    members = models.ManyToManyField(User)
    creator_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_workspaces"
    )
    channels = models.ManyToManyField(Channel, related_name="channels")
    created_at = models.DateTimeField(auto_now_add=True)


class WorkSpaceInviteLink(models.Model):
    id = models.UUIDField(default=uuid4)
    creator_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_workspaces"
    )
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
