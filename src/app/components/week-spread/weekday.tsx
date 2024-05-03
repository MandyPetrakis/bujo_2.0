import { fetchEventsByDay } from "@/app/lib/data";
import clsx from "clsx";
import AddEventButton from "./addEventButton";

export default async function WeekDay(props: {
  day: number;
  dayOfWeek: string;
  month: string;
  date: Date;
  today: Date;
}) {
  const events = await fetchEventsByDay(props.date.toDateString());
  const isToday = props.date.toDateString() == props.today.toDateString();

  const allDayEvents = events
    .filter((e) => e.all_day === true || e.time === null || e.time === 0)
    .map((e) => {
      return (
        <div className="flex">
          <div className="font-semibold">{e.description}</div>
        </div>
      );
    });

  const morningEvents = events
    .filter((e) => e.time >= 1 && e.time <= 11)
    .map((e) => {
      return (
        <div key={e.id} className="flex">
          <div className="font-semibold mr-1">{e.time}:</div>
          <div>{e.description}</div>
        </div>
      );
    });

  const afternoonEvents = events
    .filter((e) => e.time >= 12 && e.time <= 17)
    .map((e) => {
      return (
        <div key={e.id} className="flex">
          <div className="font-semibold mr-1">{e.time}:</div>
          <div>{e.description}</div>
        </div>
      );
    });

  const eveningEvents = events
    .filter((e) => e.time >= 18)
    .map((e) => {
      return (
        <div key={e.id} className="flex">
          <div className="font-semibold mr-1">{e.time}:</div>
          <div>{e.description}</div>
        </div>
      );
    });

  return (
    <div
      className={clsx(
        "border group h-[325px] p-2 mr-2 min-w-fit flex flex-col items-center grow",
        { "border-[2px]": isToday }
      )}
    >
      <div className="font-semibold text-sm ">
        {props.dayOfWeek.slice(0, 3)}
      </div>
      <div className={clsx("flex text-xs mb-2}", { "font-semibold": isToday })}>
        <p className="mr-2">{props.month}</p>
        <p>{props.day}</p>
      </div>
      <AddEventButton date={props.date} />
      <div></div>
      <div key="all day" className="text-xs h-1/4">
        {allDayEvents}
      </div>
      <div key="morning" className="text-xs h-1/4">
        {morningEvents}
      </div>
      <div key="afternooon" className="text-xs h-1/4">
        {afternoonEvents}
      </div>
      <div key="evening" className="text-xs h-1/4">
        {eveningEvents}
      </div>
    </div>
  );
}
