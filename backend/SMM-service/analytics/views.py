from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from channel.models import Channel
from telegram.models import TelegramPost
from analytics.serializers import TelegramPostSerializer
from analytics.views_reactions import update_workspace_data
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@permission_classes([IsAuthenticated])
class WorkspaceChannels(APIView):
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
        try:
            channels = Channel.objects.filter(workspace_id=workspace_id)
            workspace_data = {}
            for channel in channels:
                telegram_posts = TelegramPost.objects.filter(telegram_channel=channel).all()
                telegram_post_serializer = TelegramPostSerializer(telegram_posts, many=True)
                workspace_data[channel.name] = telegram_post_serializer.data

            updated_workspace_data = update_workspace_data(workspace_data)

            if updated_workspace_data:
                return Response({"workspace_data": updated_workspace_data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to update workspace data"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
