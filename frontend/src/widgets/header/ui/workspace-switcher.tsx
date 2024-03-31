import { cn } from "@/shared/lib";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/shared/ui/command";
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Workspace = {
  label: string;
  slug: string;
};

const workspaces: Workspace[] = [
  {
    label: "string",
    slug: "string",
  },
  {
    label: "string2",
    slug: "string2",
  },
];

export const WorkspaceSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(workspaces[0]);

  const { t } = useTranslation();

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Выбор workspace"
            className={"w-[200px] justify-between"}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={``} alt={``} className="grayscale" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Поиск..." />
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.slug}
                  onSelect={() => {
                    setSelectedTeam(workspace);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={``}
                      alt={workspace.label}
                      className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {workspace.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedTeam.slug === workspace.slug
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <Link to="/workspace/create">
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        setShowNewTeamDialog(true);
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      {t("new-workspace")}
                    </CommandItem>
                  </Link>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
};
