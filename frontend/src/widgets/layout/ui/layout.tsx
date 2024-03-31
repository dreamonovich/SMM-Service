import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export interface LayoutProps {
  withSidebar: boolean;
}

export const Layout: FC<LayoutProps> = ({ withSidebar }) => {
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
