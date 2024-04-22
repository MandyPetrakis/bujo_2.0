import { fetchEventsByDay } from "@/app/lib/data";
import clsx from "clsx";

export default async function WeekDay(props: {
  day: number;
  dayOfWeek: string;
  month: string;
  date: Date;
  today: Date;
}) {
  const events = await fetchEventsByDay(props.date.toDateString());
  const isToday = props.date.toDateString() == props.today.toDateString();

  const eventsDisplay = events.map((event) => event.description);
  return (
    <div
      className={clsx(
        "border h-[325px] p-2 mr-2 min-w-fit flex flex-col items-center grow",
        { "border-[2px]": isToday }
      )}
    >
      <div className="font-semibold text-sm">{props.dayOfWeek.slice(0, 3)}</div>
      <div className={clsx("flex text-xs mb-2}", { "font-semibold": isToday })}>
        <p className="mr-2">{props.month}</p>
        <p>{props.day}</p>
      </div>
      <div className="text-sm">{eventsDisplay}</div>
    </div>
  );
}
