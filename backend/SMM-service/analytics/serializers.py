from rest_framework import serializers
from channel.models import Channel
from telegram.models import TelegramPost


class TelegramPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramPost
        fields = ['id', 'post', 'telegram_channel','message_id', 'status', 'posted_at', 'modified_at', 'created_at']

#'channel_name'