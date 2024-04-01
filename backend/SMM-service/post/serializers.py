from rest_framework import serializers
from .models import Post
from user.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Post
        fields = ['id', 'name', 'text', 'creator', 'photos', "files", "status", "number_of_people", "created_at"]
        read_only_fields = ("id", "creator", "status", "modified_at", "created_at")
