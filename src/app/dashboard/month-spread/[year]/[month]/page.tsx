import Calendar from "@/app/components/month-spread/calendar";
import MonthHeader from "@/app/components/month-spread/month-header";
import Todos from "@/app/components/month-spread/todos";
import Goals from "@/app/components/month-spread/goals";
import {
  PreviousButton,
  NextButton,
} from "@/app/components/month-spread/buttons";

export default function MonthSpread({
  params,
}: {
  params: { year: number; month: number };
}) {
  const year = params.year;
  const month = params.month;

  return (
    <div className="flex">
      <div className="mr-10 pt-10 pb-5 w-1/4">
        <div className="flex items-center mb-10 place-content-center">
          <PreviousButton month={month} year={year} />
          <MonthHeader month={month} />
          <NextButton month={month} year={year} />
        </div>
        <Goals />
      </div>
      <div className="flex h-screen pt-10 pb-5 w-3/4">
        <Todos />
        <Calendar year={year} month={month} />
      </div>
    </div>
  );
}
