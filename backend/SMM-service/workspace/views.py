from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied, ValidationError
from .models import Workspace, WorkSpaceInviteLink
from user.models import User
from .serializers import WorkspaceSerializer, WorkSpaceMembersSerializer


class WorkSpaceListCreate(ListCreateAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        print(self.request.user.name)
        return Workspace.objects.filter(creator_user=self.request.user).all()


class WorkSpaceRetrieveDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        obj = super().get_object()
        if self.request.user not in obj.members.all():
            raise PermissionDenied("You have no access")
        return obj

    def delete(self, request, *args, **kwargs):
        workspace = self.get_object()
        if workspace.creator_user != request.user:
            raise PermissionDenied("You have no access")
        workspace.delete()


class WorkSpaceMembers(RetrieveAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkSpaceMembersSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"

    def get_object(self):
        obj = super().get_object()
        if self.request.user not in obj.members.all():
            raise PermissionDenied("You have no access")
        return obj


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def get_invite_link(request, workspace_id):
    workspace = Workspace.objects.filter(id=workspace_id).first()
    if workspace is None or workspace.creator_user != request.user:
        raise PermissionDenied("You have no access")

    invite = WorkSpaceInviteLink(creator_user=request.user, workspace=workspace)
    invite.save()

    return Response({"link": invite.id})


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def join_workspace(request, token):
    invite = WorkSpaceInviteLink.objects.filter(id=token).first()
    if invite is None:
        raise ValidationError("The link is not working")
    invite.workspace.members.add(request.user)
    invite.workspace.save()
    invite.delete()
    return Response({"response": "success"})


class WorkSpaceLeave(APIView):
    permission_classes = (IsAuthenticated,)

    def get_workspace(self, workspace_id, user):
        workspace = Workspace.objects.filter(id=workspace_id).first()
        if workspace is None:
            raise ValidationError("The workspace is not found")
        if user not in workspace.members.all():
            raise PermissionDenied("You do not in this workspace")
        return workspace

    def post(self, workspace_id):
        workspace = self.get_workspace(workspace_id, self.request.user)
        workspace.members.remove(self.request.user)
        workspace.save()
        return Response({"status": "ok"})


class WorkSpaceRemoveMember(WorkSpaceLeave):

    def post(self, workspace_id, user_id):
        user = User.objects.filter(id=user_id).first()
        if user is None:
            raise ValidationError("The user is not found")
        workspace = self.get_workspace(workspace_id, user)
        workspace.members.remove(user)
        workspace.save()
        return Response({"status": "ok"})
