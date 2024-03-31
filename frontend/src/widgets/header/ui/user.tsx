import i18n from "@/app/providers/i18n";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/shared/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export const User = () => {
  const { t } = useTranslation();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">shadcn</p>
              <p className="text-xs leading-none text-muted-foreground">
                m@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {t('profile')}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('settings')}
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>{t('new-workspace')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
                i18n.changeLanguage('en')
            }}>{t('language')}</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {t('log-out')}
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
