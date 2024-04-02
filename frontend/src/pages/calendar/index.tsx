import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useWorkspaceStore } from "@/entities/workspace";
import { useEffect, useMemo } from "react";
const locales = {
  "en-US": enUS,
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

  const events = useMemo(() => {
    if (!posts || !posts.length) return;
    return posts.map((obj) => {
      return {
        title: obj.name,
        allDay: false,
        start: new Date(obj.send_planned_at),
        end: new Date(obj.send_planned_at),
        isMine: true,
        status: obj.status
      };
    });
  }, [posts]);

  // [
  //   {
  //     title: "All Day Event very long title",
  //     allDay: true,
  //     start: new Date(),
  //     end: new Date(),
  //   },
  // ];
  return (
    <div className="h-full flex items-center justify-center">
      <Calendar
        eventPropGetter={(event) => {
          const newStyle = {
            backgroundColor: "lightgrey",
            color: "black",
            borderRadius: "0px",
            border: "none",
          };
          switch (event.status) {
            case "CREATED":
              newStyle.backgroundColor = "green";
              break;
            case "PENDING":
              newStyle.backgroundColor = "blue";
              break;
            case "APPROVED":
              newStyle.backgroundColor = "green";
              break;
            case "ALL_SENT":
              newStyle.backgroundColor = "black";
              break;
            case "REJECTED":
              newStyle.backgroundColor = "red";
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
        // style={{ height: 500 }}
      />
    </div>
  );
};
