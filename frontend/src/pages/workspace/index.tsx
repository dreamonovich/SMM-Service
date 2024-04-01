import { PostList, usePostStore } from "@/entities/post";
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
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);
  const { selectedPost } = usePostStore();
  const options = {
    method: "GET",
    headers: {
      Authorization:
        `"Bearer" + ${TOKEN_HEADER}`,
        "Content-Type": 'application/json',
    }
  };
  
  const { id } = useParams();
  const getData = async () => {
    const response = await fetch(API_URL + "/workspace/" + id, options);
    const data = await response.json();
    setWorkspace(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  // добавить красивый лоадер
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="h-[100%]">
          <ResizablePanelGroup direction="horizontal" className="h-[100%]">
            <ResizablePanel>
              Workspace {id} {JSON.stringify(workspace)}
              <PostList items={[{ id: "1", text: "Помидор" }, { id: "2", text: "Помидор 123"}]} />
            </ResizablePanel>
            {selectedPost ? (
              <>
                <ResizableHandle />
                <ResizablePanel><PostEditor/></ResizablePanel>
              </>
            ) : null}
          </ResizablePanelGroup>
        </div>
      )}
    </>
  );
};
