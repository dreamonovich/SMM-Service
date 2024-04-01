from rest_framework import serializers
from .models import Workspace, WorkSpaceInviteLink
from user.serializers import UserSerializer


class WorkspaceSerializer(serializers.ModelSerializer):
    creator_user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Workspace
        fields = ("id", "name", "creator_user")
        read_only_fields = ("id", "creator_user")

    def create(self, validated_data):
        user = self.context.get("request").user
        print(user.name, "creat")
        new_workspace = Workspace(name=validated_data["name"], creator_user=user)
        new_workspace.save()
        new_workspace.members.add(user)
        return new_workspace


class WorkSpaceMembersSerializer(serializers.ModelSerializer):
    members = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Workspace
        fields = ("id", "members")
