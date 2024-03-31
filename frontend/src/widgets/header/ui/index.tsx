import { User } from "./user";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const Header = () => {
  return (
    <div>
      <div className="flex gap-2 h-16 items-center px-3 border justify-between">
        <WorkspaceSwitcher />
        <User />
      </div>
    </div>
  );
};
