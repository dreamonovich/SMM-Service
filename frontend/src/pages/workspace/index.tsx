import { PostList, usePostStore } from "@/entities/post";
import { useWorkspaceStore } from "@/entities/workspace";
import { PostEditor } from "@/features/post/editor";
import { Button } from "@/shared/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const WorkspacePage = () => {
  const { id } = useParams();

  const { selectedPost, setSelectedPost } = usePostStore();
  const { selectedWorkspace, fetchChannels, posts, fetchPosts } = useWorkspaceStore();

  useEffect(() => {
    if (!id) return
    fetchChannels(Number(id));
    fetchPosts(Number(id))

    return () => {
      setSelectedPost(null)
    }
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
              <PostList items={posts || []} />
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
