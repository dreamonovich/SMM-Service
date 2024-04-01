import { AddMember } from "@/features/workspace/add-member";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function Settings() {
  //get from backend
  const link = "https://bebra.com";
  return (
    <>
    <AddMember />
    </>
  );
}
