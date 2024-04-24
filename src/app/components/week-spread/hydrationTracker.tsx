import HydrationDay from "./hydrationDay";

export default async function HydrationTracker(props: {
  datesArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  // returns hydration progress bar for each day in the dates array
  const hydrationProgressBar = props.datesArray.map((day, index) => {
    return <HydrationDay date={day.date} key={index} />;
  });

  // length=  total units displayed in the tracker
  const length = 10;
  //returns the units header from the user determined length
  const unitsHeader = Array.from({ length }, (_, index) => {
    const start = 1;
    const unit = start + index;
    return (
      <p key={unit} className="w-5 flex place-content-center text-sm">
        {unit}
      </p>
    );
  });

  return (
    <div className="pt-5 pl-5">
      <p className="flex place-content-center text-sm font-semibold mb-5">
        Hydration
      </p>
      <div className="flex mb-2">{unitsHeader}</div>
      {hydrationProgressBar}
    </div>
  );
}
