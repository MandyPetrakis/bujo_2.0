import WeekDay from "./weekday";
import { isSunday, previousSunday } from "date-fns";
import { createWeekArray } from "@/app/lib/data";

export default async function Week(props: {
  date: Date;
  weeknumber: number;
  startOfWeek: Date;
}) {
  const weekArray = createWeekArray(props.startOfWeek);

  const displayWeek = weekArray.map((day) => {
    return (
      <WeekDay
        key={day.dayOfWeek}
        day={day.day}
        dayOfWeek={day.dayOfWeek}
        month={day.month}
        date={day.date}
      />
    );
  });

  return <div className="flex w-full ">{displayWeek}</div>;
}
