import { usePostStore } from "@/entities/post";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Textarea } from "@/shared/ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { useWorkspaceStore } from "@/entities/workspace";
import { useParams } from "react-router-dom";

export const PostEditor = () => {
  const { selectedPost, updateSelected, setSelectedPost, fetchPosts } =
    usePostStore();
  const { selectedWorkspace } = useWorkspaceStore();
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { id } = useParams();
  const create = async () => {
    const formData = new FormData();

    formData.append("name", selectedPost?.name!);
    formData.append("text", selectedPost?.text!);
    formData.append(
      "number_of_confirmations",
      String(selectedPost?.number_of_confirmations!)
    );
    formData.append("send_planned_at", selectedPost?.send_planned_at!);

    for (const image of images) {
      formData.append("photos", image);
    }
    for (const file of files) {
      formData.append("files", file);
    }

    const res = await fetch(
      API_URL + `/workspace/${selectedWorkspace?.id}/posts`,
      {
        method: "POST",
        headers: {
          Authorization: TOKEN_HEADER,
        },
        body: formData,
      }
    );

    if (res.ok) {
      setSelectedPost(null);
      fetchPosts(Number(id));
    }
  };
  const update = async () => {
    const formData = new FormData();

    formData.append("name", selectedPost?.name!);
    formData.append("text", selectedPost?.text!);
    formData.append(
      "number_of_confirmations",
      String(selectedPost?.number_of_confirmations!)
    );
    formData.append("send_planned_at", selectedPost?.send_planned_at!);

    const res = await fetch(API_URL + `/post/${selectedPost?.id}`, {
      method: "PATCH",
      headers: {
        Authorization: TOKEN_HEADER,
      },
      body: formData,
    });

    const data = await res.json();
    if (data) {
    }
  };

  return (
    <div className="grid w-full gap-2 p-2">
      <h3 className="text-2xl">
        {selectedPost?.create ? "Создание поста" : "Редактирование поста"}
      </h3>
      <Input
        placeholder="Название поста..."
        value={selectedPost?.name || ""}
        onChange={(e) => {
          updateSelected({ name: e.target.value });
        }}
      />
      <Textarea
        placeholder="Текст..."
        value={selectedPost?.text || ""}
        onChange={(e) => {
          updateSelected({ text: e.target.value });
        }}
      />
      <Input
        placeholder="Количество одобряющих..."
        value={selectedPost?.number_of_confirmations || ""}
        onChange={(e) => {
          updateSelected({ number_of_confirmations: +e.target.value });
        }}
      />
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal"
                //!date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedPost?.send_planned_at ? (
                format(selectedPost?.send_planned_at, "PPP")
              ) : (
                <span>Выбрать дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(selectedPost?.send_planned_at || new Date())}
              onSelect={(e) => {
                updateSelected({ send_planned_at: e?.toISOString() });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          placeholder="Час"
          onChange={(e) => {
            const date = new Date(selectedPost?.send_planned_at || new Date());
            date.setHours(+e.target.value);
            updateSelected({send_planned_at: date.toISOString()})
          }}
        />
        <Input
          placeholder="Минуты"
          onChange={(e) => {
            const date = new Date(selectedPost?.send_planned_at || new Date());
            date.setMinutes(+e.target.value);
            updateSelected({send_planned_at: date.toISOString()});
            console.log(date)
          }}
        />
      </div>
      <div>
        <label htmlFor="images">Картинки:</label>
        <Input
          type="file"
          id="images"
          multiple
          onChange={(e) => {
            const images = Array(...(e.target.files as unknown as File[]));
            setImages(images);
          }}
        />
      </div>
      <div>
        <label htmlFor="files">Файлы:</label>
        <Input
          type="file"
          id="files"
          multiple
          onChange={(e) => {
            const files = Array(...(e.target.files as unknown as File[]));
            setFiles(files);
          }}
        />
      </div>
      {!selectedPost?.create && (
        <div id="photos" className="grid grid-cols-2 p-2 gap-1">
          {selectedPost?.photos?.map((photo) => {
            const r = photo.url.replace("minio:9000", "158.160.32.163:9011");
            return (
              <div className="relative h-[100px]">
                <img key={photo.id} className="rounded-lg absolute" src={r} />
                <button className="absolute bg-white w-5 h-5 rounded-lg text-black top-1 right-1">
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}
      <Button
        onClick={async () => {
          selectedPost?.create ? create() : update();
        }}
      >
        {selectedPost?.create ? "Создать" : "Сохранить"}
      </Button>
    </div>
  );
};
