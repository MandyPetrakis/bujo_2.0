import {
  fetchHydrationByDay,
  fetchHydrationConfigsByDay,
} from "@/app/lib/data";
import clsx from "clsx";
import { revalidatePath } from "next/cache";

export default async function HydrationDay(props: { date: Date }) {
  revalidatePath("page");

  const hydrationGoal = await fetchHydrationConfigsByDay(
    props.date.toDateString()
  );

  const hydrationData = await fetchHydrationByDay(props.date.toDateString());

  //daily units is declared and set to 0 in the event the user hasn't yet entered data for that day
  let dayUnits = 0;

  //if the DB returns data for the day, the units are set to the stored data
  if (hydrationData.length !== 0) {
    dayUnits = parseInt(hydrationData[0].hydration);
  }
  const length = Math.max(hydrationGoal[0].hydration_goal, dayUnits);

  // units - creates an array the length of total units displayed for each day
  const units = Array.from({ length }, (_, index) => {
    //returns a div container and another div "progress bar" for each unit, with the background set to dark if the user has tracked that number of hydration units for the day.
    return (
      <div
        key={index}
        className={clsx({
          "border-r border-medium":
            hydrationGoal[0].hydration_goal == index + 1,
        })}
      >
        <div
          key={index}
          className={clsx("h-[12px] w-1", {
            "bg-dark": dayUnits >= index + 1,
          })}
        ></div>
      </div>
    );
  });

  return (
    <div
      key={props.date.toDateString()}
      className="flex place-content-center h-[24px]"
    >
      {units}
      <p className="flex place-content-center text-sm h-[24px] w-5 pl-4">
        {dayUnits}
      </p>
    </div>
  );
}
