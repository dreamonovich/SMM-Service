import { ScrollArea } from "@/shared/ui/scroll-area";
import { FC } from "react";
import { usePostStore } from "..";
import { cn } from "@/shared/lib";

export const PostList: FC<{ items: any[] }> = ({ items }) => {
  const { selectedPost, setSelectedPost } = usePostStore();
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-2 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all w-full hover:bg-accent",
              selectedPost?.id === item.id && "bg-muted"
            )}
            onClick={() =>
              setSelectedPost(item)
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedPost?.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {new Date().toLocaleString()}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};
