import { PostList, usePostStore } from "@/entities/post";
import { useWorkspaceStore } from "@/entities/workspace";
import { PostEditor } from "@/features/post/editor";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WorkspacePage = () => {
  const { id } = useParams();

  const { selectedPost } = usePostStore();
  const { selectedWorkspace, fetchWorkspaceById } = useWorkspaceStore();
  const [posts, setPosts] = useState([])
  useEffect(() => {
    if(!id) return
    console.log(id)

    fetchWorkspaceById(id);

    (async () => {
      const res = await fetch(API_URL + `/workspace/${id}/posts`, {
        headers: {
          Authorization: TOKEN_HEADER,
        }
      });
      const data = await res.json();
      setPosts(data)
    })();
  }, [id])

  return (
    <>
        <div className="h-[100%]">
          <h1 className="font-semibold text-3xl">{selectedWorkspace?.name}</h1>
          <ResizablePanelGroup direction="horizontal" className="h-[100%]">
            <ResizablePanel>
              {JSON.stringify(selectedWorkspace)}
              <PostList
                items={[]}
              />
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
    </>
  );
};
