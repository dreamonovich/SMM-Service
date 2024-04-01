from rest_framework import serializers
from .models import Channel


class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = ("id", "name", "chat_id", "is_group")
        read_only_fields = ("id", "chat_id", "is_group")
