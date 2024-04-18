import Habits from "../../../../components/month-spread/habits";
import Calendar from "@/app/components/month-spread/calendar";
import MonthHeader from "@/app/components/month-header";
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
    <div className="p-5">
      <div className="flex items-center mb-10">
        <PreviousButton month={month} year={year} />
        <MonthHeader month={month} />
        <NextButton month={month} year={year} />
      </div>
      <Calendar year={year} month={month} />
    </div>
  );
}
