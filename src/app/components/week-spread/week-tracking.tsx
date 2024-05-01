import SleepTracker from "../trackers/sleepTracker";
import HydrationTracker from "../trackers/hydrationTracker";
import HabitTracker from "../trackers/habitTracker";

export default async function Tracking(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const daysOfWeek = props.weekArray.map((day) => {
    return (
      <div
        key={day.day}
        className="mr-2 w-7 font-semibold flex place-content-center"
      >
        {day.dayOfWeek.charAt(0)}
      </div>
    );
  });
  return (
    <div className="border p-5 ml-5 overflow-scroll w-full">
      <p className="flex place-content-center text-sm font-semibold mb-2">
        Tracking
      </p>
      <div className="flex">
        <div className="pt-[85px] h-[24px]">{daysOfWeek}</div>
        <HabitTracker datesArray={props.weekArray} />
        <SleepTracker datesArray={props.weekArray} />
        <HydrationTracker datesArray={props.weekArray} />
      </div>
    </div>
  );
}
