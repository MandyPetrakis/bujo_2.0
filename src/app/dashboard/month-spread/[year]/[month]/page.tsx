import Calendar from "@/app/components/month-spread/calendar";
import MonthHeader from "@/app/components/month-spread/month-header";
import Todos from "@/app/components/month-spread/todos";
import Goals from "@/app/components/month-spread/goals";
import Routines from "@/app/components/month-spread/routines";

import { PreviousButton, NextButton } from "@/app/components/buttons";

export default function MonthSpread({
  params,
}: {
  params: { year: number; month: number };
}) {
  const year = params.year;
  const month = params.month;

  return (
    <div className="flex">
      <div className="mr-10 pt-10 pb-5 w-1/4 h-screen">
        <div className="flex items-center mb-10 place-content-center ">
          <PreviousButton display={month} year={year} page={"month"} />
          <MonthHeader month={month} />
          <NextButton display={month} year={year} page={"month"} />
        </div>
        <Goals />
        <Routines />
      </div>
      <div className="flex h-screen pt-10 pb-5 w-3/4">
        <Todos />
        <Calendar year={year} month={month} />
      </div>
    </div>
  );
}
