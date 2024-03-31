import { Button } from "@/shared/ui/button";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCalendarClear, IoStatsChart } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-64px)] border-r w-[250px]">
      <div className="flex flex-col gap-2 p-2">
        <Button variant="secondary" className="w-full justify-start flex gap-2">
          <MdOutlineMailOutline /> Отложенные
        </Button>
        <Button variant="ghost" className="w-full justify-start flex gap-2">
          <IoCalendarClear /> Календарь
        </Button>
        <Button variant="ghost" className="w-full justify-start flex gap-2">
          <FaTelegram /> Каналы
        </Button>
        <Button variant="ghost" className="w-full justify-start flex gap-2">
          <IoStatsChart /> Статистика
        </Button>
      </div>
    </div>
  );
};
