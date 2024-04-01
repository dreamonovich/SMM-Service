import { useWorkspaceStore } from "@/entities/workspace";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useEffect, useState } from "react";

export const AddMember = () => {
  const { selectedWorkspace } = useWorkspaceStore();
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

  return (
    <>
      <div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Настройки рабочего пространства
          </h2>
          <div className="flex items-center justify-between mb-4">
            <Input
              className="border-gray-300"
              readOnly
              type="text"
              value={"https://pomidro"}
            />
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Команда:</h3>
            <div className="space-y-3">
              {members?.members.map((member) => (
                <div className="flex items-center justify-between">
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
          </div>
        </div>
      </div>
    </>
  );
};
