import { useUserStore } from "@/entities/user";
import { useWorkspaceStore } from "@/entities/workspace";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddMember = () => {
  const navigate = useNavigate();

  const { selectedWorkspace, fetchWorkspaces } = useWorkspaceStore();
  const { user } = useUserStore();
  const creator = useMemo(
    () => user?.id == selectedWorkspace?.creator_user?.id,
    [user, selectedWorkspace]
  );
  const [inviteLink, setInviteLink] = useState("");

  const [members, setMembers] = useState<{
    id: number;
    members: any[];
  } | null>(null);

  useEffect(() => {
    if (!selectedWorkspace?.id) return;
    (async () => {
      const res = await fetch(
        API_URL + `/workspace/${selectedWorkspace?.id}/members`,
        {
          headers: {
            Authorization: TOKEN_HEADER,
          },
        }
      );
      const data = await res.json();
      setMembers(data);
    })();
  }, [selectedWorkspace]);

  useEffect(() => {
    if (!selectedWorkspace?.id) return;
    (async () => {
      const res = await fetch(
        API_URL + "/workspace/" + selectedWorkspace?.id + "/invitelink",
        {
          method: "GET",
          headers: {
            Authorization: TOKEN_HEADER,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setInviteLink(`http://prodanocontest.ru/invite/${data.link}`);
    })();
  }, [selectedWorkspace]);

  const leaveTeam = async (id: number) => {
    const res = await fetch(API_URL + "/workspace/" + id + "/leave", {
      method: "POST",
      headers: {
        Authorization: TOKEN_HEADER,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const workspaces = await fetchWorkspaces();
      if (!workspaces.length){
        navigate(`/workspaces/create`)
      }
      navigate(`/workspaces/${workspaces[0].id}`);
    }
    else{alert("Не удалось удалить рабочее пространство")}
  };

  const deleteFromTeam = async (userId: number) => {
    const res = await fetch(
      API_URL +
        "/workspace/" +
        selectedWorkspace?.id +
        "/remove_member/" +
        userId,
      {
        method: "POST",
        headers: {
          Authorization: TOKEN_HEADER,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      (async () => {
        const res = await fetch(
          API_URL + `/workspace/${selectedWorkspace?.id}/members`,
          {
            headers: {
              Authorization: TOKEN_HEADER,
            },
          }
        );
        const data = await res.json();
        setMembers(data);
      })();
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Настройки рабочего пространства
          </h2>
          {creator && <div className="flex items-center justify-between mb-4">
            <div>Ссылка для приглашения</div>
            <span>{inviteLink}</span>
          </div>}
          <hr className="my-4" />
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Команда:</h3>
            <div className="space-y-3">
              {members?.members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage alt={member.name} src={member.avatar} />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">
                        @{member.telegram_username}
                      </div>
                    </div>
                  </div>
                  {user?.id != member?.id ? (
                    creator && (
                      <Button onClick={() => deleteFromTeam(member.id)}>
                        Удалить
                      </Button>
                    )
                  ) : (
                    <Button onClick={() => leaveTeam(Number(selectedWorkspace?.id))}>Покинуть</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
