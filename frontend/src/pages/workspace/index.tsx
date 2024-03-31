import { API_URL } from "@/shared/lib/constants";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WorkspacePage = () => {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);

  const { id } = useParams();
  const getData = async () => {
    const response = await fetch(API_URL + "/workspaces/" + id);
    const data = await response.json();
    setWorkspace(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(false);
    getData();
  }, []);
  // добавить красивый лоадер
  const [visible, setVisible] = useState(false);
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="h-[100%]">
          <ResizablePanelGroup direction="horizontal" className="h-[100%]">
            <ResizablePanel>
              <ScrollArea>
                Workspace {id} {JSON.stringify(workspace)}
                <button onClick={() => setVisible(!visible)}>test</button>
                <button
                  
                  className={
                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full"}
                  onClick={() => console.log('bebra')}
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">item.name</div>
                        {/* {!item.read && (
                          <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                        )} */}
                      </div>
                      {/* <div
                        className={cn(
                          "ml-auto text-xs",
                          mail.selected === item.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {formatDistanceToNow(new Date(item.date), {
                          addSuffix: true,
                        })}
                      </div> */}
                    </div>
                    <div className="text-xs font-medium">item.subject</div>
                  </div>
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    item.text.substring(0, 300)
                  </div>
                  {/* {item.labels.length ? (
                    <div className="flex items-center gap-2">
                      {item.labels.map((label) => (
                        <Badge
                          key={label}
                          variant={getBadgeVariantFromLabel(label)}
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  ) : null} */}
                </button>
              </ScrollArea>
            </ResizablePanel>
            {visible ? (
              <>
                <ResizableHandle />
                <ResizablePanel>Two</ResizablePanel>
              </>
            ) : (
              <></>
            )}
          </ResizablePanelGroup>
        </div>
      )}
    </>
  );
};
