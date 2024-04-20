import WeekDay from "./weekday";
import { isSunday, previousSunday } from "date-fns";
import { createWeekArray } from "@/app/lib/data";

export default async function Week(props: { date: Date; weeknumber: number }) {
  let startOfWeek;

  isSunday(props.date)
    ? (startOfWeek = props.date)
    : (startOfWeek = previousSunday(props.date));

  const weekArray = createWeekArray(startOfWeek);

  const displayWeek = weekArray.map((day) => {
    return (
      <WeekDay
        key={day.dayOfWeek}
        date={day.date}
        dayOfWeek={day.dayOfWeek}
        month={day.month}
      />
    );
  });

  return (
    <div>
      {props.weeknumber}
      <div className="flex">{displayWeek}</div>
    </div>
  );
}
