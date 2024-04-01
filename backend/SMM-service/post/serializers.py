from rest_framework import serializers
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied

from workspace.serializers import WorkspaceSerializer
from .models import Workspace, Post, PostTemplate
from user.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = self.context.get("request").user
        if not (workspace_id := self.context['view'].kwargs.get('workspace_id')):
            raise ValidationError(f"workspace_id is required")
        if not (workspace := Workspace.objects.filter(id=workspace_id).first()):
            raise NotFound("workspace not found")
        if user not in workspace.members.all():
            raise PermissionDenied("workspace not found")

        return Post.objects.create(creator=user, workspace=workspace, **validated_data)

    class Meta:
        model = Post
        fields = ("id", "creator", "workspace", "modified_at", "created_at", "name", "text", "send_planned_at", "number_of_people")
        read_only_fields = ("id", "creator", "workspace", "modified_at", "created_at")


class PostTemplateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = self.context.get("request").user
        if not (workspace_id := self.context['view'].kwargs.get('workspace_id')):
            raise ValidationError(f"workspace_id is required")
        if not (workspace := Workspace.objects.filter(id=workspace_id).first()):
            raise NotFound("workspace not found")
        if user not in workspace.members.all():
            raise PermissionDenied("workspace not found")

        return PostTemplate.objects.create(creator=user, workspace=workspace, **validated_data)

    class Meta:
        model = Post
        fields = ("id", "text", "workspace", "modified_at", "created_at", "name")
        read_only_fields = ("id", "workspace", "modified_at", "created_at")