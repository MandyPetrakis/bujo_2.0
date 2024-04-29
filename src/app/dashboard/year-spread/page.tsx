import { createYearArray } from "@/app/lib/data";
import SleepTracker from "@/app/components/week-spread/sleepTracker";

export default function YearSpread() {
  const dateArray = createYearArray(2024);

  return <div>{/* <SleepTracker datesArray={dateArray} /> */}</div>;
}
