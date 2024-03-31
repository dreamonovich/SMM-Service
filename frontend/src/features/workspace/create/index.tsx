import { API_URL } from "@/shared/lib/constants";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/shared/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function CreateWorkflow() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const onClickAdd = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      const data = await res.json();
      toast({
        title: "Workflow успешно создан",
      });
      navigate(`/workspaces/${data.id}`);
    } else {
      toast({
        title: "Произошла ошибка при создании",
        description: "Попробуйте позже",
      });
    }
  };
  return (
    <Card className="max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Создать workflow</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label {...{"for": "title"}}>Название</Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="title"
            placeholder=""
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onClickAdd()} className="w-full">
          Создать
        </Button>
      </CardFooter>
    </Card>
  );
}
