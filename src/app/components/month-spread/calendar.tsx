import { createMonthArray } from "@/app/lib/data";
import Day from "./day";

export default function Calendar(props: { year: number; month: number }) {
  // creates an array with the length of the days in the currently viewed month.
  // maps through the array to add the events on that day.

  const calendar = createMonthArray(props.year, props.month).map((day) => {
    return <Day params={{ day }} key={day.day} />;
  });

  return <div className="w-3/4 mt-[33px]">{calendar}</div>;
}
