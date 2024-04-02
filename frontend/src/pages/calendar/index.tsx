import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ru from "date-fns/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useWorkspaceStore } from "@/entities/workspace";
import { useEffect, useMemo } from "react";
const locales = {
  ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarPage = () => {
  const { fetchPosts, selectedWorkspace, posts } = useWorkspaceStore();
  useEffect(() => {
    if (!selectedWorkspace?.id) return;

    fetchPosts(Number(selectedWorkspace?.id));
  }, [selectedWorkspace]);
  const messages = {
    allDay: "Весь день",
    previous: "<",
    next: ">",
    today: "Сегодня",
    month: "Месяц",
    week: "Неделя",
    day: "День",
    agenda: "События",
    date: "Дата",
    time: "Время",
    event: "Событие",
  };
  const events = useMemo(() => {
    if (!posts || !posts.length) return;
    return posts.map((obj) => {
      return {
        title: obj.name,
        allDay: false,
        start: new Date(obj.send_planned_at),
        end: new Date(obj.send_planned_at),
        isMine: true,
        status: obj.status,
      };
    });
  }, [posts]);
  return (
    <div className="h-full flex items-center justify-center">
      <Calendar
        eventPropGetter={(event: any) => {
          const newStyle = {
            backgroundColor: "lightgrey",
            color: "black",
            borderRadius: "0px",
            border: "none",
          };
          switch (event.status) {
            case "CREATED":
              newStyle.backgroundColor = "#aad576";
              break;
            case "PENDING":
              newStyle.backgroundColor = "#1d4ed8";
              break;
            case "APPROVED":
              newStyle.backgroundColor = "#84cc16";
              break;
            case "ALL_SENT":
              newStyle.backgroundColor = "#1d4ed8";
              break;
            case "REJECTED":
              newStyle.backgroundColor = "#ef6f6c";
              break;

            default:
              break;
          }

          return {
            className: "",
            style: newStyle,
          };
        }}
        className="h-[80%] w-[80%]"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="ru"
        messages={messages}
      />
    </div>
  );
};
