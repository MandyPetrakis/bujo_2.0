import Calendar from "@/app/components/month-spread/calendar";
import MonthHeader from "@/app/components/month-spread/month-header";
import Todos from "@/app/components/todos";
import Goals from "@/app/components/month-spread/goals";
import { createMonthArray } from "@/app/lib/data";

import { PreviousButton, NextButton } from "@/app/components/buttons";
import MonthTracking from "@/app/components/month-spread/month-tracking";

export default function MonthSpread({
  params,
}: {
  params: { year: number; month: number };
}) {
  const year = params.year;
  const month = params.month;

  const datesArray = createMonthArray(params.year, params.month);

  return (
    <div className="h-screen w-dvw p-5">
      <div className="flex h-[100px]">
        <div className="flex items-center place-content-center mr-10">
          <PreviousButton display={month} year={year} page={"month"} />
          <MonthHeader month={month} />
          <NextButton display={month} year={year} page={"month"} />
        </div>
        <Goals />
      </div>
      <div className="flex pt-10 pb-5 h-dvh">
        <Todos />
        <Calendar year={year} month={month} datesArray={datesArray} />
        <MonthTracking datesArray={datesArray} />
      </div>
    </div>
  );
}
