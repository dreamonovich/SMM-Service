import { ScrollArea } from "@/shared/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui/badge";
import { IoIosMore } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { useWorkspaceStore } from "@/entities/workspace";
import { useParams } from "react-router-dom";
import { Icons } from "@/shared/ui/icons";

export type Channel = {
  id: number;
  name: string;
  chat_id: number;
  is_group: boolean;
};

export const ChannelsList = ({ items }: { items: Channel[] }) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { fetchChannels } = useWorkspaceStore();
  const { id: workspaceId } = useParams();
  const onClickSave = async (id: number) => {
    setIsLoading(true);
    const res = await fetch(API_URL + "/channel/" + id, {
      method: "PATCH",
      headers: {
        Authorization: TOKEN_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    if (res.ok) {
      await fetchChannels(+(workspaceId ?? 0));
      setOpen(false);
      setIsLoading(false);
    }
  };
  const onClickDelete = async (id: number) => {
    setIsLoading(true);
    const res = await fetch(API_URL + "/channel/" + id, {
      method: "DELETE",
      headers: {
        Authorization: TOKEN_HEADER,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      await fetchChannels(+(workspaceId ?? 0));
      setOpen(false);
    }
    setIsLoading(false);
  };
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-2 pt-0 pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all w-full hover:bg-accent",
              selectedChannel?.id === item.id && "bg-muted"
            )}
            onClick={() => setSelectedChannel(item)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.name}</div>
                  </div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {item.is_group ? (
                    <Badge variant="destructive">Группа</Badge>
                  ) : (
                    <Badge>Канал</Badge>
                  )}{" "}
                  ChatId: {item.chat_id}
                </div>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button>
                    <IoIosMore
                      className="h-full w-8"
                      onClick={() => setName(item.name)}
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Настройки канала</DialogTitle>
                    <DialogDescription>
                      Здесь вы можете изменить название канала и удалить его.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Название
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between">
                    <Button
                      className="bg-red-700"
                      onClick={() => {
                        onClickDelete(item.id);
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                        </>
                      ) : null}
                      Удалить
                    </Button>
                    <Button
                      onClick={() => {
                        onClickSave(item.id);
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                        </>
                      ) : null}
                      Сохранить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
