import { createMonthArray } from "@/app/lib/data";
import Day from "./day";
// import Habits from "./habits";

export default function Calendar(props: {
  year: number;
  month: number;
  datesArray: { day: number; dayOfWeek: string; date: Date }[];
}) {
  // creates an array with the length of the days in the currently viewed month.
  // maps through the array to add the events on that day.
  const today = new Date();

  const calendar = props.datesArray.map((day) => {
    return <Day day={day} key={day.day} today={today} />;
  });

  return (
    <div className="flex h-dvh overflow-scroll px-10 w-1/3">
      <div className="grow">{calendar}</div>
    </div>
  );
}
