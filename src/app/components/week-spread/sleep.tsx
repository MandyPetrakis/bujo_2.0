import { createWeekArray } from "@/app/lib/data";
import clsx from "clsx";

export default async function SleepTracker(props: { startOfWeek: Date }) {
  const sleepArray = createWeekArray(props.startOfWeek);

  const sleepTimes = [
    [10, 11, 12, 13, 14, 15, 16, 17],
    [12, 13, 14, 15, 16, 17, 18, 19],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [11, 12, 13, 14, 15, 16, 17],
    [13, 14, 15, 16, 17, 18, 19],
    [11, 12, 13, 14, 15, 16],
    [11, 12, 13, 14, 15, 16, 17, 18, 19],
  ];

  const sleepDisplay = sleepArray.map((day, index) => {
    const sleepHours = sleepTimes[index];
    const length = 12;
    const startTime = 10;

    const hours = Array.from({ length }, (_, index) => {
      const sleeping = sleepHours.includes(startTime + index);
      return (
        <div
          key={startTime + index}
          className={clsx("h-3 w-5", {
            "bg-dark": sleeping === true,
          })}
        ></div>
      );
    });

    return (
      <div key={day.day} className="flex items-center">
        <p className="mr-2 w-7 font-semibold border-r flex place-content-center">
          {day.dayOfWeek.charAt(0)}
        </p>
        {hours}
        <p className="flex place-content-center text-sm pl-2">
          {sleepHours.length}
        </p>
      </div>
    );
  });

  const length = 12;
  const hoursArray = Array.from({ length }, (_, index) => {
    const startTime = 10;
    let hour;

    if (startTime + index > 12) {
      hour = startTime + index - 12;
    } else hour = startTime + index;

    return { hour: hour };
  });
  const hoursDispaly = hoursArray.map((h) => (
    <p className="w-5 flex place-content-center text-sm">{h.hour}</p>
  ));
  return (
    <div className="ml-5 border p-5">
      <p className="flex place-content-center text-sm font-semibold mb-3">
        Sleep Tracker
      </p>
      <div className="flex pl-8">{hoursDispaly}</div>
      {sleepDisplay}
    </div>
  );
}
