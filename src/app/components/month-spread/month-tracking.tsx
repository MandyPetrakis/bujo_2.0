import SleepTracker from "../trackers/sleepTracker";
import HabitTracker from "../trackers/habitTracker";
import HydrationTracker from "../trackers/hydrationTracker";

export default async function MonthTracking(props: {
  datesArray: { day: number; dayOfWeek: string; date: Date }[];
}) {
  return (
    <div className="flex overflow-scroll snap-x w-[400px] ">
      <div className="snap-center w-[400px] mx-[100px]">
        <HabitTracker datesArray={props.datesArray} />
      </div>
      <div className="snap-center w-[400px] mx-[100px]">
        <SleepTracker datesArray={props.datesArray} />
      </div>
      <div className="snap-center w-[400px] mx-[100px]">
        <HydrationTracker datesArray={props.datesArray} />
      </div>
    </div>
  );
}
