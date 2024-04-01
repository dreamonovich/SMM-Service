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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWorkspaceStore } from "@/entities/workspace/store";


export const WorkspaceSwitcher = () => {
  const {workspaces} = useWorkspaceStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const {selectedWorkspace, fetchWorkspaceById } = useWorkspaceStore()

  const { t } = useTranslation();

  useEffect(() => {}, [])

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Выбор workspace"
            className={"min-w-[200px] justify-between"}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={``} alt={``} className="grayscale" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedWorkspace?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Поиск..." />
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              <div className="flex flex-col gap-1 px-2 py-1">
                {workspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    onClick={() => {
                      fetchWorkspaceById(workspace.id);
                      navigate(`/workspaces/${workspace.id}`)
                      localStorage.setItem('last_open_workspace_id', String(workspace.id))
                      setOpen(false);
                    }}
                    className="text-sm flex items-center rounded-lg pt-2 hover:bg-gray-100"
                  >
                    <Avatar className="mr-2 h-5 w-5 mb-2">
                      <AvatarImage
                        src={``}
                        alt={workspace.name}
                        className="grayscale"
                      />
                      <AvatarFallback>asd</AvatarFallback>
                    </Avatar>
                    <span className="pb-2 ">{workspace.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 mb-2",
                        selectedWorkspace?.id === workspace.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </div>
                ))}
              </div>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <Link to="/workspaces/create">
                    <CommandItem>
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
