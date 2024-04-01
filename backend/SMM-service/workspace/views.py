from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveAPIView
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


class WorkSpaceMembers(RetrieveAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkSpaceMembersSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"

    def get_queryset(self):
        obj = super().get_queryset()
        print(obj)
        return obj
