from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import ChannelRequest, Channel
from .serializers import ChannelSerializer


class ChannelListCreate(ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "workspace_id"

    def create(self, request, *args, **kwargs):
        code = request.data.get("code")
        name = request.data.get("name")
        workspace_id = request.data.get("workspace_id")
        if code is None or name is None or workspace_id is None:
            raise ValidationError("Please provide code, name and workspace")
        channel_request = ChannelRequest.objects.filter(code=code).first()
        if channel_request is None:
            raise ValidationError("The code is invalid")

        new_channel = Channel(name=name, chat_id=channel_request.chat_id, is_group=channel_request.is_group,
                              workspace_id=workspace_id)
        new_channel.save()
        channel_request.delete()
        serializer = self.get_serializer(new_channel)
        return Response(serializer.data)


class RetrieveUpdateDestroyChannel(RetrieveUpdateDestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsAuthenticated,)
