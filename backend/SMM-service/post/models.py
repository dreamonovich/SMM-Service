from django.db import models
from django.contrib.postgres import fields
    
from workspace.models import Workspace
from user.models import User

class Post(models.Model):
    name = models.CharField(max_length=64)
    text = models.TextField(max_length=4096)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_posts')
    photos = fields.ArrayField(models.FilePathField())
    files = fields.ArrayField(models.FilePathField())
    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)