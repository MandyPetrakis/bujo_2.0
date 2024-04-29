import HydrationDay from "./hydrationDay";
import { fetchHydrationDisplayRange } from "@/app/lib/data";

export default async function HydrationTracker(props: {
  datesArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const hydrationDisplayLength = await fetchHydrationDisplayRange(
    props.datesArray[0].date.toDateString(),
    props.datesArray[props.datesArray.length - 1].date.toDateString()
  );

  const hydrationLength = hydrationDisplayLength[0].highest_hydration;

  // returns hydration progress bar for each day in the dates array
  const hydrationProgressBar = props.datesArray.map((day, index) => {
    return (
      <HydrationDay
        date={day.date}
        key={index}
        hydrationLength={hydrationLength}
      />
    );
  });

  const unitsHeaderFunction = (length: number) => {
    // Generate an array of marker values from 10 to hydrationRange
    const markers = [];
    for (let i = 10; i <= length; i += 10) {
      markers.push(i);
    }

    return (
      <div className="flex place-content-center text-sm">
        {markers.map((marker) => (
          <div key={marker} className="mr-1 w-[30px]">
            {marker}
          </div>
        ))}
      </div>
    );
  };

  const unitsHeader = unitsHeaderFunction(hydrationLength);

  return (
    <div className="pt-5">
      <p className="flex place-content-center text-sm font-semibold mb-5">
        Hydration
      </p>
      <div className="mb-2">{unitsHeader}</div>
      {hydrationProgressBar}
    </div>
  );
}
