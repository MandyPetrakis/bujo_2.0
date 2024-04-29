import WeekDay from "./weekday";
import { createWeekArray } from "@/app/lib/data";

export default async function Week(props: {
  date: Date;
  weeknumber: number;
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const today = new Date();

  const displayWeek = props.weekArray.map((day) => {
    return (
      <WeekDay
        key={day.dayOfWeek}
        day={day.day}
        dayOfWeek={day.dayOfWeek}
        month={day.month}
        date={day.date}
        today={today}
      />
    );
  });

  return <div className="flex w-full ">{displayWeek}</div>;
}
