import { fetchHydrationByDay } from "@/app/lib/data";
import clsx from "clsx";

export default async function HydrationDay(props: { date: Date }) {
  const hydrationData = await fetchHydrationByDay(props.date.toDateString());

  // length=  total units displayed in the tracker
  const length = 10;

  //daily units is declared and set to 0 in the event the user hasn't yet entered data for that day
  let dayUnits = 0;

  //if the DB returns data for the day, the units are set to the stored data
  if (hydrationData.length !== 0) {
    dayUnits = hydrationData[0].units;
  }

  // units - creates an array the length of total units displayed for each day
  const units = Array.from({ length }, (_, index) => {
    //returns a div container and another div "progress bar" for each unit, with the background set to dark if the user has tracked that number of hydration units for the day.
    return (
      <div
        key={index}
        className={clsx("h-[12px] w-5", {
          "bg-dark": dayUnits >= index + 1,
        })}
      ></div>
    );
  });

  return (
    <div
      key={props.date.toDateString()}
      className="flex place-content-center h-[24px]"
    >
      {units}
      <p className="flex place-content-center text-sm h-[24px] w-5 pl-2">
        {dayUnits}
      </p>
    </div>
  );
}
