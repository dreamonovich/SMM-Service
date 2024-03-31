import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";

export const Profile = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full p-4 flex items-center justify-between">
        <div>
          <div className="text-4xl font-semibold">Ваш профиль</div>
          <div className="text-l text-gray-500">
            Так вас будут видеть другие пользователи
          </div>
        </div>
        <div className="flex flex-row">
          <div className="mr-4">
            <div className="text-3xl font-semibold text-right">Username</div>
            <div className="text-l text-gray-500 text-right">@telegram</div>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator />
    </div>
  );
};
