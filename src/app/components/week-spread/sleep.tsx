import clsx from "clsx";

export default async function SleepTracker(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const sleepTimes = [
    [10, 11, 12, 13, 14, 15, 16, 17],
    [12, 13, 14, 15, 16, 17, 18, 19],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [11, 12, 13, 14, 15, 16, 17],
    [13, 14, 15, 16, 17, 18, 19],
    [11, 12, 13, 14, 15, 16],
    [11, 12, 13, 14, 15, 16, 17, 18, 19],
  ];

  const sleepDisplay = props.weekArray.map((day, index) => {
    const sleepHours = sleepTimes[index];
    const length = 12;
    const startTime = 10;

    const hours = Array.from({ length }, (_, index) => {
      const sleeping = sleepHours.includes(startTime + index);
      return (
        <div className="h-[24px] place-content-center flex">
          <div
            key={startTime + index}
            className={clsx("h-3 w-5", {
              "bg-dark": sleeping === true,
            })}
          ></div>
        </div>
      );
    });

    return (
      <div key={day.day} className="flex items-center pl-10">
        {hours}
        <p className="flex place-content-center text-sm h-[24px] ">
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
    <p key={h.hour} className="w-5 flex place-content-center text-sm">
      {h.hour}
    </p>
  ));
  return (
    <div className="pt-5">
      <p className="flex place-content-center text-sm font-semibold mb-5">
        Sleep
      </p>
      <div className="flex pl-8 mb-2">{hoursDispaly}</div>
      {sleepDisplay}
    </div>
  );
}
