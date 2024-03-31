import { FC, ReactNode } from "react";

export interface ItemMenuProps {
  children: ReactNode;
}

export const ItemMenu: FC<ItemMenuProps> = ({ children }) => {
  return (
    <div className="text-sm font-medium transition-colors hover:text-primary">
      {children}
    </div>
  );
};
