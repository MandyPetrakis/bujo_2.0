import { fetchHydrationByDay } from "@/app/lib/data";
import clsx from "clsx";

export default async function HydrationDay(props: {
  day: { dayOfWeek: string; day: number; month: string; date: Date };
}) {
  const hydrationData = await fetchHydrationByDay(
    props.day.date.toDateString()
  );
  console.log(hydrationData[0]);
  const length = 10;
  const units = Array.from({ length }, (_, index) => {
    let dayUnits = 0;
    if (hydrationData.length !== 0) {
      dayUnits = hydrationData[0].units;
    }

    return (
      <div key={index} className="h-[24px] place-content-center flex">
        <div
          key={index}
          className={clsx("h-3 w-5", {
            "bg-dark": dayUnits >= index + 1,
          })}
        ></div>
      </div>
    );
  });

  return (
    <div key={props.day.day} className="flex items-center pl-10">
      {units}
      <p className="flex place-content-center text-sm h-[24px] ml-2">{}</p>
    </div>
  );
}
