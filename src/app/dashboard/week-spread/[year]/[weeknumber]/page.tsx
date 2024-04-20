import Week from "@/app/components/week-spread/week";
import Todos from "@/app/components/month-spread/todos";
import SleepTracker from "@/app/components/week-spread/sleep";
import { getDateOfWeek } from "@/app/lib/data";
import { isSunday, previousSunday } from "date-fns";

export default function WeekSpread({
  params,
}: {
  params: { year: number; weeknumber: number };
}) {
  const date = getDateOfWeek(params.weeknumber, params.year);
  let startOfWeek;
  isSunday(date) ? (startOfWeek = date) : (startOfWeek = previousSunday(date));

  return (
    <div className="pt-10 pb-5 h-screen w-full">
      <div className="">Week {params.weeknumber}</div>
      <div className="flex h-1/2 mb-5">
        <Todos />
        <SleepTracker startOfWeek={startOfWeek} />
      </div>
      <div className="flex w-full">
        <Week
          date={date}
          weeknumber={params.weeknumber}
          startOfWeek={startOfWeek}
        />
      </div>
    </div>
  );
}