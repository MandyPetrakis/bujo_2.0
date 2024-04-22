import { createMonthArray } from "@/app/lib/data";
import Day from "./day";
import Habits from "./habits";

export default function Calendar(props: { year: number; month: number }) {
  // creates an array with the length of the days in the currently viewed month.
  // maps through the array to add the events on that day.
  const today = new Date();

  const calendar = createMonthArray(props.year, props.month).map((day) => {
    return <Day day={day} key={day.day} today={today} />;
  });

  return (
    <div className="flex w-2/3 h-full overflow-scroll px-10 pt-12 ">
      <div className="mt-[25px] grow">{calendar}</div>
      <Habits year={props.year} month={props.month} />
    </div>
  );
}
