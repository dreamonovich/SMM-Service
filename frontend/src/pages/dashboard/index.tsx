import { PostList } from "@/entities/post";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export const Dashboard = () => {
  return (
    <main className="flex-col flex">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-2 w-full">
          <PostList
            items={[
              {
                id: 1,
                name: "123",
                subject: "123",
                text: "123",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
};
