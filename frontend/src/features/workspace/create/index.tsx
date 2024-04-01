import { API_URL } from "@/shared/lib/constants";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/shared/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function CreateWorkspace() {
  const options = {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyMzUyNTU1LCJpYXQiOjE3MTE5MjA1NTUsImp0aSI6IjRiZjNjN2ZhY2I1ZDQzNWQ4ZjNkYjhhNWZmMTViYmI5IiwidXNlcl9pZCI6Mn0.w0GA_IoUw7yjZ3kz7pvz0YaDdx1rbaxsLl5MsmriIoo",
        "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      name: "my super duper workspace",
    }),
  };
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const onClickAdd = async () => {
    console.log('reqeusts')
    const res = await fetch(
      API_URL+"/workspace",
      options
    );
    console.log(res);

    if (res.ok) {
      const data = await res.json();
      toast({
        title: "Workspace успешно создан",
      });
      navigate(`/workspaces/${data.id}`);
    } else {
      toast({
        title: "Произошла ошибка при создании",
        description: "Попробуйте позже",
      });
    }
  };
  const [, setTitle] = useState('')

  return (
    <Card className="min-w-[350px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Создать workspace</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label {...{ for: "title" }}>Название</Label>
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
