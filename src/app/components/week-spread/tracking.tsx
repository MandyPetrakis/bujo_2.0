import SleepTracker from "./sleep";
import Habits from "./habits";
import Hydration from "./hydration";

export default async function Tracking(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const daysOfWeek = props.weekArray.map((day) => {
    return (
      <div
        key={day.day}
        className="mr-2 w-7 font-semibold place-content-center"
      >
        {day.dayOfWeek.charAt(0)}
      </div>
    );
  });
  return (
    <div className="border pt-5 px-5 ml-5 overflow-scroll">
      <p className="flex place-content-center text-sm font-semibold mb-2">
        Tracking
      </p>
      <div className="flex">
        <div className="pt-[85px]">{daysOfWeek}</div>
        <Habits startOfWeek={props.startOfWeek} weekArray={props.weekArray} />
        <SleepTracker
          startOfWeek={props.startOfWeek}
          weekArray={props.weekArray}
        />
        <Hydration
          startOfWeek={props.startOfWeek}
          weekArray={props.weekArray}
        />
      </div>
    </div>
  );
}
