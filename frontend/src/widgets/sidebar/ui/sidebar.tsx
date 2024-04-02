import { Button } from "@/shared/ui/button";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCalendarClear, IoStatsChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { LiaHistorySolid } from "react-icons/lia";
import { Link, useLocation, useParams  } from "react-router-dom";
export const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation()
  console.log(location)
  return (
    <div className="h-[calc(100vh-64px)] border-r w-[250px]">
      <div className="flex flex-col gap-2 p-2">
        <Link to={`/workspaces/${id}`}>
          <Button
            variant={location.pathname.endsWith(`${id}`) ? "secondary" : 'ghost'}
            className="w-full justify-start flex gap-2"
          >
            <MdOutlineMailOutline /> Отложенные
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/calendar`}>
          <Button             variant={location.pathname.endsWith(`calendar`) ? "secondary" : 'ghost'}
 className="w-full justify-start flex gap-2">
            <IoCalendarClear /> Календарь
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/channels`}>
          <Button variant={location.pathname.endsWith(`channels`) ? "secondary" : 'ghost'} className="w-full justify-start flex gap-2">
            <FaTelegram /> Каналы
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/stats`}>
          <Button variant={location.pathname.endsWith(`stats`) ? "secondary" : 'ghost'} className="w-full justify-start flex gap-2">
            <IoStatsChart /> Статистика
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/archive`}>
          <Button variant={location.pathname.endsWith(`archive`) ? "secondary" : 'ghost'} className="w-full justify-start flex gap-2">
            <LiaHistorySolid /> Архив
          </Button>
        </Link>
        <Link to={`/workspaces/${id}/settings`}>
          <Button variant={location.pathname.endsWith(`settings`) ? "secondary" : 'ghost'} className="w-full justify-start flex gap-2">
            <IoMdSettings /> Настройки
          </Button>
        </Link>
      </div>
    </div>
  );
};
