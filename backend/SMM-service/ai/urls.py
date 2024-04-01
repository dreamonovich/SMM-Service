from django.urls import path
from ai.views import MessageProcessing

urlpatterns = [
    path('process-message/', MessageProcessing.as_view(), name='process_message'),
]

