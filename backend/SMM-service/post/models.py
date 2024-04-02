from django.db import models
from user.models import User
from workspace.models import Workspace

STATUS_CHOICES = [
    ('CREATED', 'Created'),
    ('PENDING', 'Pending Publication'),
    ('APPROVED', 'Approved'),
    ('ALL_SENT', 'All Sent'),
    ('REJECTED', 'Rejected'),
]


class Post(models.Model):
    name = models.CharField(max_length=64)
    text = models.TextField(max_length=4096)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_posts"
    )
    send_planned_at = models.DateTimeField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CREATED')
    number_of_confirmations = models.IntegerField()

    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class PostPhoto(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    photo = models.FileField(upload_to='post/photo/')


class PostFile(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to='post/file/')


class PostTemplate(models.Model):
    name = models.CharField(max_length=64)
    text = models.TextField(max_length=4096)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)

    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)