import { useUserStore } from "@/entities/user";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Icons } from "@/shared/ui/icons";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { FormEvent, useEffect, useState } from "react";

export const Profile = () => {
  const { user, fetchUser } = useUserStore();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const options = {
    method: "PATCH",
    headers: {
      Authorization: TOKEN_HEADER,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  };
  const handleNameChange = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch(API_URL + "/me", options);
    if (res.ok) {
      fetchUser();
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full p-4 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Ваш профиль</h1>
          <h2 className="text-l text-gray-500">
            Так вас будут видеть другие пользователи
          </h2>
        </div>
        <div className="flex flex-row">
          <div className="mr-4">
            <div className="text-3xl font-semibold text-right">
              {user?.name}
            </div>
            <div className="text-l text-gray-500 text-right">
              @{user?.telegram_id}
            </div>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>Loading</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="mb-10" />

      <form className="w-5/6 space-y-6" onSubmit={(e) => handleNameChange(e)}>
        <label>Имя пользователя</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Button type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Сохранить
        </Button>
      </form>
      <div></div>
    </div>
  );
};
