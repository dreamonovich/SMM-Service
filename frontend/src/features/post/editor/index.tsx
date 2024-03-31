import { usePostStore } from "@/entities/post";

export const WorkspaceEditor = () => {
  const { selectedPost } = usePostStore();
  return <div>{JSON.stringify(selectedPost)}</div>;
};
