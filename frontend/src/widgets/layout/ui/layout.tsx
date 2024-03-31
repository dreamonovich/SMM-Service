import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { useEffect } from "react";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useWorkspaceStore } from "@/entities/workspace/store";
export interface LayoutProps {
  withSidebar: boolean;
}

export const Layout: FC<LayoutProps> = ({ withSidebar }) => {
  const {fetchWorkspaces} = useWorkspaceStore()
  useEffect(() => {
    fetchWorkspaces()
  }, [])
  
  return (
    <main className="flex-col flex">
      <Header />
      {withSidebar && (
        <div className="flex">
          <Sidebar />
          <div className="p-2 w-full">
            <Outlet />
          </div>
        </div>
      )}
      {!withSidebar && <Outlet />}
    </main>
  );
};
