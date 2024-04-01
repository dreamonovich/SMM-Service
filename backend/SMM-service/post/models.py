from django.contrib.postgres import fields
from django.db import models
from user.models import User
from workspace.models import Workspace

STATUS_CHOICES = [
    ('CREATED', 'Created'),
    ('PENDING', 'Pending Publication'),
    ('UNDER_REVIEW', 'Under Review'),
    ('APPROVED', 'Approved'),
    ('REJECTED', 'Rejected'),
]


class Post(models.Model):
    name = models.CharField(max_length=64)
    text = models.TextField(max_length=4096)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_posts"
    )
    photos = fields.ArrayField(models.CharField(max_length=300))
    files = fields.ArrayField(models.CharField(max_length=300))
    send_planned_at = models.DateTimeField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CREATED')
    number_of_people = models.IntegerField()

    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
