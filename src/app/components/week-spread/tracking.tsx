import SleepTracker from "./sleep";
import Habits from "./habits";

export default async function Tracking(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  return (
    <div className="border p-5 ml-5">
      <p className="flex place-content-center text-sm font-semibold mb-2">
        Tracking
      </p>
      <div className="flex">
        <Habits startOfWeek={props.startOfWeek} weekArray={props.weekArray} />
        <SleepTracker
          startOfWeek={props.startOfWeek}
          weekArray={props.weekArray}
        />
      </div>
    </div>
  );
}
