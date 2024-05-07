import {
  fetchHydrationByDay,
  fetchHydrationConfigsByDay,
} from "@/app/lib/data";
import clsx from "clsx";
import AddDataButton from "../buttons/addDataButton";

export default async function HydrationDay(props: {
  date: Date;
  hydrationLength: number;
}) {
  const hydrationGoal = await fetchHydrationConfigsByDay(
    props.date.toDateString()
  );

  const hydrationData = await fetchHydrationByDay(props.date.toDateString());

  //daily units is declared and set to 0 in the event the user hasn't yet entered data for that day
  let dayUnits = 0;
  let hasId = "false";

  //if the DB returns data for the day, the units are set to the stored data
  if (hydrationData.length !== 0) {
    dayUnits = parseInt(hydrationData[0].hydrations);
    hasId = hydrationData[0].id;
  }
  const length = props.hydrationLength;

  // units - creates an array the length of total units displayed for each day
  const units = Array.from({ length }, (_, index) => {
    //returns a div container and another div "progress bar" for each unit, with the background set to dark if the user has tracked that number of hydration units for the day.
    return (
      <div
        key={index}
        className={clsx("w-[3px]", {
          "border-r border-medium":
            hydrationGoal[0].hydration_goal == index + 1,
        })}
      >
        <div
          key={index}
          className={clsx("h-[12px] w-[3px]", {
            "bg-dark": dayUnits >= index + 1,
          })}
        ></div>
      </div>
    );
  });

  return (
    <div
      key={props.date.toDateString()}
      className="flex h-[24px] pl-8 relative group"
    >
      {units}
      {hasId !== "false" ? null : (
        <AddDataButton hasId={hasId} date={props.date} type="hydration" />
      )}
      <div className="flex place-content-center text-xs h-[24px] w-1 ml-8">
        {dayUnits}
        <p className="ml-1">{hydrationGoal[0].hydration_type}</p>
      </div>
    </div>
  );
}
