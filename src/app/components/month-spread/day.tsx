import { fetchEventsByDay } from "@/app/lib/data";
import clsx from "clsx";

export default async function Day(props: {
  day: {
    day: number;
    dayOfWeek: string;
    date: Date;
  };
  today: Date;
}) {
  const events = await fetchEventsByDay(props.day.date.toDateString());

  const eventsDisplay = events.map((event) => event.description);
  const isToday = props.day.date.toDateString() === props.today.toDateString();

  return (
    <div
      className={clsx(
        "flex whitespace-nowrap h-[16px] mb-[8px] text-xs border-b border-medium",
        {
          "border-b-[2px] border-b-dark": isToday === true,
        }
      )}
      key={props.day.day}
    >
      <div
        className={clsx("w-7 flex justify-end mr-1", {
          "font-semibold": isToday === true,
        })}
      >
        {props.day.day}
      </div>
      <div
        className={clsx("w-5 flex justify-center mr-1", {
          "font-semibold": isToday === true,
        })}
      >
        {props.day.dayOfWeek.charAt(0)}
      </div>
      <div>{eventsDisplay}</div>
    </div>
  );
}
