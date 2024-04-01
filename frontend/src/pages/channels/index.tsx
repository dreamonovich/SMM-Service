import { ChannelsList } from "@/entities/channels/ui/channels-list";
import { Channel, usePostStore } from "@/entities/post";
import { PostEditor } from "@/features/post";
import { TOKEN_HEADER, API_URL } from "@/shared/lib/constants";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Channels = () => {
  const [loading, setLoading] = useState(true);
  const { selectedPost } = usePostStore();
  const [channels, setChannels] = useState<Channel[]>([]);

  const { id } = useParams();
  const getData = async () => {
    const response = await fetch(API_URL + "/workspace/" + id + "/channels", {
      method: "GET",
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await response.json();
    setChannels(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <>
        {!loading && (
          <div className="h-[100%] w-full">
            <ResizablePanelGroup direction="horizontal" className="h-[100%]">
              <ResizablePanel>
                <div className="w-full p-4 flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-semibold">Ваши каналы</h1>
                    <h2 className="text-l text-gray-500">
                      Здесь будут отображаться каналы текущего рабочего
                      пространства
                    </h2>
                  </div>
                </div>
                <ChannelsList items={channels || []} />
              </ResizablePanel>
              {selectedPost ? (
                <>
                  <ResizableHandle />
                  <ResizablePanel>
                    <PostEditor />
                  </ResizablePanel>
                </>
              ) : null}
            </ResizablePanelGroup>
          </div>
        )}
      </>
    </div>
  );
};
