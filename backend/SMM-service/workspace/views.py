from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Workspace
from .serializers import WorkspaceSerializer, WorkSpaceMembersSerializer


class WorkSpaceListCreate(ListCreateAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Workspace.objects.filter(creator_user=self.request.user).all()


class WorkSpaceRetrieveView(RetrieveDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsAuthenticated,)


class WorkSpaceMembers(ListAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkSpaceMembersSerializer
    permission_classes = (IsAuthenticated,)
