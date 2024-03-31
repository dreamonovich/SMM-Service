from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken

from user.models import User
from user.serializers import UserSerializer


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = AccessToken.for_user(user)
            response = Response({'message': str(token)}, status=status.HTTP_201_CREATED)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def authenticate_user(request):
    if request.method == 'POST':
        telegram_id = request.data.get('telegram_id')
        if not telegram_id:
            return Response({'error': 'Telegram ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(telegram_id=telegram_id)
        except User.DoesNotExist:
            return Response({'error': 'User with this Telegram ID does not exist'}, status=status.HTTP_404_NOT_FOUND)

        token = AccessToken.for_user(user)

        serializer = UserSerializer(user)

        response_data = {
            'user': serializer.data,
            'token': str(token),
        }
        return Response(response_data, status=status.HTTP_200_OK)