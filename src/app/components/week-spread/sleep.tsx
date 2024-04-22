import SleepDay from "./sleepDay";

export default async function SleepTracker(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const userSleepSettings = { startTime: 21, length: 13 };
  const length = userSleepSettings.length;
  const startTime = userSleepSettings.startTime;

  const sleepDisplay = props.weekArray.map((day) => {
    return <SleepDay day={day} length={length} startTime={startTime} />;
  });

  const hoursDispaly = Array.from({ length }, (_, index) => {
    let hour;

    if (startTime + index > 24) {
      hour = startTime + index - 24;
    } else hour = startTime + index - 12;

    return (
      <p key={hour} className="w-5 flex place-content-center text-sm">
        {hour}
      </p>
    );
  });

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
