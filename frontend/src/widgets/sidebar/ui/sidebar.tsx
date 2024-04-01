import { Button } from "@/shared/ui/button";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCalendarClear, IoStatsChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { LiaHistorySolid } from "react-icons/lia";
import { Link, useParams  } from "react-router-dom";
export const Sidebar = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="h-[calc(100vh-64px)] border-r w-[250px]">
      <div className="flex flex-col gap-2 p-2">
        <Link to={`/workspaces/${id}`}>
          <Button
            variant="secondary"
            className="w-full justify-start flex gap-2"
          >
            <MdOutlineMailOutline /> Отложенные
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/calendar`}>
          <Button variant="ghost" className="w-full justify-start flex gap-2">
            <IoCalendarClear /> Календарь
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/channels`}>
          <Button variant="ghost" className="w-full justify-start flex gap-2">
            <FaTelegram /> Каналы
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/stats`}>
          <Button variant="ghost" className="w-full justify-start flex gap-2">
            <IoStatsChart /> Статистика
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/archive`}>
          <Button variant="ghost" className="w-full justify-start flex gap-2">
            <LiaHistorySolid /> Архив
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/settings`}>
          <Button variant="ghost" className="w-full justify-start flex gap-2">
            <IoMdSettings /> Настройки
          </Button>
        </Link>
      </div>
    </div>
  );
};
