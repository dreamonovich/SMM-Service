from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Workspace
from .serializers import WorkspaceSerializer

# Create your views here.


class WorkSpaceListCreate(ListCreateAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Workspace.objects.filter(creator_user=self.request.user).all()


class WorkSpaceRetrieveView(RetrieveDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]

