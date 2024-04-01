from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from .models import Workspace
from .serializers import WorkspaceSerializer, WorkSpaceMembersSerializer


class WorkSpaceListCreate(ListCreateAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        print(self.request.user.name)
        return Workspace.objects.filter(creator_user=self.request.user).all()


class WorkSpaceRetrieveView(RetrieveDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("You have no access")


class WorkSpaceMembers(RetrieveAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkSpaceMembersSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("You have no access")
