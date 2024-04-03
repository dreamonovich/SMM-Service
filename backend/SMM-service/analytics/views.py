from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.db.models import Q
from channel.models import Channel
from telegram.models import TelegramPost
from analytics.serializers import TelegramPostSerializer
from analytics.views_reactions import update_workspace_data, update_workspace_data_list
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

logging.info("started")


# @permission_classes([IsAuthenticated])
class AnalyticsWorkspaceChannels(APIView):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name="workspace_id",
                in_=openapi.IN_PATH,
                type=openapi.TYPE_INTEGER,
                description="ID of the workspace",
            )
        ]
    )

    def get(self, request, workspace_id):
        channels = Channel.objects.filter(Q(workspace_id=workspace_id) & Q(is_group=False)).all()
        workspace_data = {}
        print(channels)
        logging.info(channels)
        for channel in channels:
            telegram_posts = TelegramPost.objects.filter(telegram_channel=channel).all()
            telegram_post_serializer = TelegramPostSerializer(telegram_posts, many=True)
            logging.info(telegram_posts)

            posts_with_channel_username = []
            for post_data in telegram_post_serializer.data:
                if not channel.is_group:
                    post_data['channel_name'] = channel.channel_username
                    posts_with_channel_username.append(post_data)

            workspace_data[channel.name] = posts_with_channel_username
        print(workspace_data)
        updated_workspace_data = update_workspace_data(workspace_data)
        updated_workspace_data = update_workspace_data_list(updated_workspace_data)

        return Response({"workspace_data": updated_workspace_data}, status=status.HTTP_200_OK)
