import { usePostStore } from "@/entities/post";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { Button } from "@/shared/ui/button";
import { Icons } from "@/shared/ui/icons";
import { Input } from "@/shared/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/ui/popover";
import { useState } from "react";

export const AIButtons = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { selectedPost, updateSelected } = usePostStore();

  const askAI = async (type: string) => {
    switch (type) {
      case "append": {
        const res = await fetch(API_URL + `/process-message/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN_HEADER,
          },
          body: JSON.stringify({
            role: "Дописать текст",
            text: selectedPost?.text,
          }),
        });
        const data = await res.json();
        const text = data.result[0].message.text;

        updateSelected({ text });
        break;
      }
      case "write": {
        const res = await fetch(API_URL + `/process-message/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN_HEADER,
          },
          body: JSON.stringify({
            role: "Придумай текст по запросу",
            text: `Вот текущий текст: ${selectedPost?.text}; Выполни запрос: ${query}`,
          }),
        });
        const data = await res.json();
        const text = data.result[0].message.text;

        updateSelected({ text: selectedPost?.text + "\n" + text });
        break;
      }
      case "fix": {
        const res = await fetch(API_URL + `/process-message/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN_HEADER,
          },
          body: JSON.stringify({
            role: "Исправь",
            text: selectedPost?.text,
          }),
        });
        const data = await res.json();
        const text = data.result[0].message.text;

        updateSelected({ text: text });

        break;
      }
    }

    setQuery("");
    setLoading(false);
  };

  return (
    <div className="flex gap-1">
      <Button
        onClick={() => {
          setLoading(true);
          askAI("append");
        }}
        disabled={!selectedPost?.text || loading}
        className="flex items-center gap-2"
      >
        {loading && <Icons.spinner className="animate-spin" />} Дописать текст
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button>Сгенерировать текст</Button>
        </PopoverTrigger>
        <PopoverContent className="grid gap-1">
          <Input
            placeholder="Текст"
            value={query}
            className="w-full"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <Button
            className="w-full flex items-center gap-2"
            disabled={loading}
            onClick={() => {
              askAI("write");
              setLoading(true);
            }}
          >
            {loading && <Icons.spinner className="animate-spin" />} Отправить
          </Button>
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => {
          setLoading(true);
          askAI("fix");
        }}
        disabled={!selectedPost?.text || loading}
        className="flex items-center gap-2"
      >
        {loading && <Icons.spinner className="animate-spin" />} Исправить ошибки
      </Button>
    </div>
  );
};
