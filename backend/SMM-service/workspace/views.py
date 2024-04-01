from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied, ValidationError
from .models import Workspace, WorkSpaceInviteLink
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
        if self.request.user not in obj.members.all():
            raise PermissionDenied("You have no access")
        return obj


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
