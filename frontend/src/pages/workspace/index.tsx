import { PostList, usePostStore } from "@/entities/post";
import { useWorkspaceStore } from "@/entities/workspace";
import { PostEditor } from "@/features/post/editor";
import { Button } from "@/shared/ui/button";
import { Icons } from "@/shared/ui/icons";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WorkspacePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPost, setSelectedPost } = usePostStore();
  const { selectedWorkspace, fetchChannels, fetchPosts } = useWorkspaceStore();

  useEffect(() => {
    if (!id) return;
    fetchChannels(Number(id));

    (async () => {
      await fetchPosts(+id);
      setIsLoading(false);
    })();

    return () => {
      setSelectedPost(null);
    };
  }, [id]);

  return (
    <>
      <div className="h-full">
        {!selectedPost && (
          <div className="flex justify-between p-2">
            <h1 className="font-semibold text-3xl">
              {selectedWorkspace?.name}
            </h1>
            <Button
              onClick={() => {
                setSelectedPost({
                  create: true,
                });
              }}
            >
              Создать пост
            </Button>
          </div>
        )}
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel>
            <div className="p-2">
              {isLoading && (
                <div className="flex items-center">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  <span>загрузка...</span>
                </div>
              )}
              <PostList />
            </div>
          </ResizablePanel>
          {selectedPost && (
            <>
              <ResizableHandle />
              <ResizablePanel>
                <PostEditor />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </>
  );
};
