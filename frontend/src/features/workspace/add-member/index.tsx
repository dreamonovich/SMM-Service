import { useWorkspaceStore } from "@/entities/workspace";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AddMember = () => {
  const { selectedWorkspace } = useWorkspaceStore();
  const [inviteLink, setInviteLink] = useState('')
  const {id} = useParams()
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
  const options = {
    method: "GET",
    headers: {
      Authorization: TOKEN_HEADER,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    (async () => {
      const res = await fetch(
        API_URL + "/workspace/" + id + "/invitelink",
        options
      );
      const data = await res.json()
      console.log(data)
      setInviteLink(`http://localhost:5173/invite/${data.link}`)
    })();
  }, []);
  const leaveTeam = async (id: number) => {
    await fetch(
      API_URL + "/workspace/" + id + "/leave",
      {
        method: "POST",
        headers: {
          Authorization: TOKEN_HEADER,
          "Content-Type": "application/json",
        },
      }
    );
  }
  return (
    <>
      <div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Настройки рабочего пространства
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div>Ссылка для приглашения</div>
            <span>{inviteLink}</span>
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Команда:</h3>
            <div className="space-y-3">
              {members?.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        alt={member.name}
                        src={member.avatar_path}
                      />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">@{member.telegram_username}</div>
                    </div>
                  </div>
                  <Button>Удалить</Button>
                </div>
              ))}
            </div>
            <Button onClick={() => leaveTeam(id)}>Покинуть</Button>
          </div>
        </div>
      </div>
    </>
  );
};
