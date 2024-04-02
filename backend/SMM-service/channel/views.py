from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied
from telegram.utils import delete_message
from .models import ChannelRequest, Channel
from workspace.models import Workspace
from .serializers import ChannelSerializer


class ChannelListCreate(ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "workspace_id"

    def create(self, request, *args, **kwargs):
        code = request.data.get("code")
        name = request.data.get("name")
        workspace_id = int(request.data.get("workspace_id"))
        if code is None or name is None or workspace_id is None:
            raise ValidationError("Please provide code, name and workspace")
        channel_request = ChannelRequest.objects.filter(code=code).first()
        if channel_request is None:
            raise ValidationError("The code is invalid")
        if Channel.objects.filter(chat_id=channel_request.chat_id, workspace_id=workspace_id).exists():
            raise ValidationError("The channel is already exists")
        new_channel = Channel(name=name, chat_id=channel_request.chat_id, is_group=channel_request.is_group,
                              workspace_id=workspace_id, channel_username=channel_request.channel_username)
        new_channel.save()
        delete_message(channel_request.chat_id, channel_request.message_id)

        workspace = Workspace.objects.filter(id=workspace_id).first()
        workspace.channels.add(workspace)
        workspace.save()

        channel_request.delete()
        serializer = self.get_serializer(new_channel)
        return Response(serializer.data)

    def list(self, request, workspace_id, *args, **kwargs):
        workspace = Workspace.objects.filter(id=workspace_id).first()
        if workspace:
            if request.user in workspace.members.all():
                queryset = Channel.objects.filter(workspace_id=workspace_id).all()
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data)
            raise PermissionDenied("You have no access")
        raise ValidationError("The workspace is not exist")


class RetrieveUpdateDestroyChannel(RetrieveUpdateDestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsAuthenticated,)
