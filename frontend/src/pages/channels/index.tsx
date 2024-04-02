import { ChannelsList } from "@/entities/channels/ui/channels-list";
import { usePostStore } from "@/entities/post";
import { useWorkspaceStore } from "@/entities/workspace";
import { AddChannel } from "@/features/channel/add-channel";
import { PostEditor } from "@/features/post";
import { Icons } from "@/shared/ui/icons";
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
  const { fetchChannels, channels } = useWorkspaceStore();
  const [modalOpen, setModalOpen] = useState(true);
  const { id } = useParams();
  const getData = async () => {
    fetchChannels(+(id as string));
    setLoading(false);
  };
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getData();
  }, [id]);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <>{loading && (
                <div className="flex items-center">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  <span>загрузка...</span>
                </div>
              )}
        {!loading && (
          <div className="h-[100%] w-full">
            <ResizablePanelGroup direction="horizontal" className="h-[100%]">
              <ResizablePanel>
                <div className="w-full flex items-center justify-between p-2">
                  <div>
                    <h1 className="text-4xl font-semibold">Ваши каналы</h1>
                    <h2 className="text-l text-gray-500">
                      Здесь будут отображаться каналы текущего рабочего
                      пространства
                    </h2>
                  </div>
                  <AddChannel
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                  ></AddChannel>
                </div>
                <ChannelsList items={channels || []} />
              </ResizablePanel>
              {!!selectedPost && (
                <>
                  <ResizableHandle />
                  <ResizablePanel>
                    <PostEditor />
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </div>
        )}
      </>
    </div>
  );
};
