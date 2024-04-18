import { createCalendar } from "@/app/lib/data";
import Day from "./day";

export default function Calendar(props: { year: number; month: number }) {
  const calendar = createCalendar(props.year, props.month);

  const calendarRender = calendar.map((day) => {
    return <Day params={{ day }} key={day.day} />;
  });

  return <div>{calendarRender}</div>;
}
