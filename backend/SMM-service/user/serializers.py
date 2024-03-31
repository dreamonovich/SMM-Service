from rest_framework import serializers
from user.models import User


class RLUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'telegram_id', 'telegram_username']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'telegram_id', 'telegram_username','avatar_path']
