from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ai.yandex_gpt_request import generate_text


# Create your views here.
# @permission_classes([IsAuthenticated])
class MessageProcessing(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'role': openapi.Schema(type=openapi.TYPE_STRING),
                'text': openapi.Schema(type=openapi.TYPE_STRING),
            }
        ),
        responses={
            200: openapi.Response('Successful operation'),
            400: openapi.Response('Invalid input')
        },
        operation_description="Process message"
    )
    def post(self, request):
        data = request.data
        if "role" in data and "text" in data:
            response = generate_text(data['role'], data['text'])
            if response.status_code == 200:
                result = response.json()
                return Response({"result": result['result']['alternatives']})
            else:
                return Response({"message": "Error while querying the model"}, status=response.status_code)
        else:
            return Response({"message": "Required fields are missing"}, status=400)
