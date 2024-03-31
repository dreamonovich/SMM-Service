import { usePostStore } from "@/entities/post";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

export const PostEditor = () => {
  const { selectedPost } = usePostStore();
  return (
    <div className="grid w-full ml-2 gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
};
