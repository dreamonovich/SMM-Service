import uuid
from pathlib import Path

from rest_framework import serializers
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from rest_framework.fields import SerializerMethodField

from user.models import User
from .models import Workspace, Post, PostPhoto, PostFile


class CheckPermissionAndGetPostMixin:
    def check_permissions_and_get_post(self) -> tuple[User, Post]:
        user = self.context.get("request").user
        if not (post_id := self.context['view'].kwargs.get('post_id')):
            raise ValidationError(f"workspace_id is required")
        if not (post := Post.objects.filter(id=post_id).first()):
            raise NotFound("post not found")
        if user not in post.workspace.members.all():
            raise PermissionDenied("workspace not found")

        return user, post


class CheckPermissionAndGetWorkspaceMixin:
    def check_permissions_and_get_workspace(self) -> tuple[User, Workspace]:
        user = self.context.get("request").user
        if not (workspace_id := self.context['view'].kwargs.get('workspace_id')):
            raise ValidationError(f"workspace_id is required")
        if not (workspace := Workspace.objects.filter(id=workspace_id).first()):
            raise NotFound("workspace not found")
        if user not in workspace.members.all():
            raise PermissionDenied("workspace not found")

        return user, workspace


class CreateMediaMixin:
    def create_media(self, post, media_model, key, raise_exception_if_empty=False):
        files = self.context['request'].FILES.getlist(key)

        if raise_exception_if_empty and not files:
            raise ValidationError(f'{key} is empty')

        media_model_objs = []
        for file in files:
            file.name = str(uuid.uuid4()) + Path(file.name).suffix
            media_model_objs.append(media_model(post=post, photo=file))
        media_objs = media_model.objects.bulk_create(media_model_objs)

        return media_objs


class PostPhotoSerializer(serializers.ModelSerializer):
    url = serializers.FileField(source='photo')

    class Meta:
        model = PostPhoto
        fields = ("id", "url",)


class PostFileSerializer(serializers.ModelSerializer):
    url = serializers.FileField(source='file')

    class Meta:
        model = PostFile
        fields = ("id", "url",)


class PostCreateFileSerializer(CheckPermissionAndGetPostMixin, CreateMediaMixin, serializers.Serializer):
    url = serializers.FileField(source='file', read_only=True)

    def create(self, validated_data):
        _, post = self.check_permissions_and_get_post()

        return self.create_media(post, PostFile, "files", raise_exception_if_empty=True)

    class Meta:
        model = PostFile
        fields = ("id", "url")


class PostCreatePhotoSerializer(CheckPermissionAndGetPostMixin, CreateMediaMixin, serializers.Serializer):
    url = serializers.FileField(source='photo', read_only=True)

    def create(self, validated_data):
        _, post = self.check_permissions_and_get_post()

        return self.create_media(post, PostPhoto, "photos", raise_exception_if_empty=True)

    class Meta:
        model = PostPhoto
        fields = ("id", "url")


class PostSerializer(CheckPermissionAndGetWorkspaceMixin, CreateMediaMixin, serializers.ModelSerializer):
    files = SerializerMethodField()
    photos = SerializerMethodField()

    def create(self, validated_data):
        user, workspace = self.check_permissions_and_get_workspace()

        new_post = Post.objects.create(creator=user, workspace=workspace, **validated_data)

        self.create_media(new_post, PostPhoto, 'photos')
        self.create_media(new_post, PostFile, 'files')

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
        fields = read_only_fields + ("name", "text", "send_planned_at", "number_of_people")