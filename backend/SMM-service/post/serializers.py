import uuid

from rest_framework import serializers
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from rest_framework.fields import SerializerMethodField

from .models import Workspace, Post, PostPhoto, PostFile, PostTemplate


class PostPhotoSerializer(serializers.ModelSerializer):
    url = serializers.FileField(source='photo')

    class Meta:
        model = PostPhoto
        fields = ("url",)


class PostFileSerializer(serializers.ModelSerializer):
    url = serializers.FileField(source='file')

    class Meta:
        model = PostFile
        fields = ("url",)


class PostSerializer(serializers.ModelSerializer):
    files = SerializerMethodField()
    photos = SerializerMethodField()

    def create(self, validated_data):
        user = self.context.get("request").user
        if not (workspace_id := self.context['view'].kwargs.get('workspace_id')):
            raise ValidationError(f"workspace_id is required")
        if not (workspace := Workspace.objects.filter(id=workspace_id).first()):
            raise NotFound("workspace not found")
        if user not in workspace.members.all():
            raise PermissionDenied("workspace not found")

        new_post = Post.objects.create(creator=user, workspace=workspace, **validated_data)

        photo_files = self.context['request'].FILES.getlist('photos')
        for photo_file in photo_files:
            photo_file.name=str(uuid.uuid4())
            PostPhoto.objects.create(post=new_post, photo=photo_file)

        file_files = self.context['request'].FILES.getlist('files')
        for file_file in file_files:
            file_file.name = str(uuid.uuid4())
            PostFile.objects.create(post=new_post, file=file_file)

        return new_post

    def get_photos(self, obj):
        photos = PostPhoto.objects.filter(post=obj)
        return PostPhotoSerializer(photos, many=True).data

    def get_files(self, obj):
        files = PostFile.objects.filter(post=obj)
        return PostFileSerializer(files, many=True).data

    class Meta:
        model = Post
        read_only_fields = ("id", "creator", "workspace", "modified_at", "created_at", "photos", "files")
        fields = read_only_fields + ("name", "text", "send_planned_at", "number_of_confirmations")


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