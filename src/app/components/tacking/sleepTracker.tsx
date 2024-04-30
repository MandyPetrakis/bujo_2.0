import SleepDay from "./sleepDay";
import { fetchSleepDisplayRange } from "@/app/lib/data";
import { differenceInHours } from "date-fns";

export default async function SleepTracker(props: {
  datesArray: { day: number; date: Date }[];
}) {
  let earliest_time = 22;
  let latest_time = 9;

  const sleepDisplayRange = await fetchSleepDisplayRange(
    props.datesArray[0].date.toDateString(),
    props.datesArray[props.datesArray.length - 1].date.toDateString()
  );

  if (sleepDisplayRange.length !== 0) {
    earliest_time = sleepDisplayRange[0].earliest_time;
    latest_time = sleepDisplayRange[0].latest_time;
  }

  const sleepDisplayLength = differenceInHours(
    new Date(2024, 6, 3, latest_time, 0),
    new Date(2024, 6, 2, earliest_time, 0)
  );

  const startTime = earliest_time - 2;
  const length = sleepDisplayLength + 4;

  const sleepDisplay = props.datesArray.map((day) => {
    return (
      <SleepDay
        date={day.date}
        length={length}
        startTime={startTime}
        key={day.day}
      />
    );
  });

  const hoursHeader = Array.from({ length }, (_, index) => {
    let hour;

    if (startTime + index > 24) {
      hour = startTime + index - 24;
    } else hour = startTime + index - 12;

    return (
      <p key={index} className="w-5 flex place-content-center text-sm">
        {hour}
      </p>
    );
  });

  return (
    <div className="pt-5 pl-5 ">
      <p className="flex place-content-center text-sm font-semibold mb-5">
        Sleep
      </p>
      <div className="flex pl-8 mb-2 place-content-center">{hoursHeader}</div>
      {sleepDisplay}
    </div>
  );
}
