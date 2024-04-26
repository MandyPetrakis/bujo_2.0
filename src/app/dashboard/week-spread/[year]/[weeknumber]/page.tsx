import Todos from "@/app/components/month-spread/todos";
import Tracking from "@/app/components/week-spread/tracking";
import WeekHeader from "@/app/components/week-spread/week-header";
import Week from "@/app/components/week-spread/week";
import { getDateOfWeek, createWeekArray } from "@/app/lib/data";
import { isSunday, previousSunday } from "date-fns";
import { PreviousButton, NextButton } from "@/app/components/buttons";

export default function WeekSpread({
  params,
}: {
  params: { year: number; weeknumber: number };
}) {
  const date = getDateOfWeek(params.weeknumber, params.year);
  let startOfWeek;
  isSunday(date) ? (startOfWeek = date) : (startOfWeek = previousSunday(date));

  const weekArray = createWeekArray(startOfWeek);

  return (
    <div className="pt-10 pb-5 h-screen w-full">
      <div className="flex mb-5">
        <PreviousButton
          year={params.year}
          display={params.weeknumber}
          page={"week"}
        />
        <WeekHeader week={params.weeknumber} />
        <NextButton
          year={params.year}
          display={params.weeknumber}
          page={"week"}
        />
      </div>
      <div className="flex h-[325px] mb-5 w-full">
        <Todos />
        <Tracking startOfWeek={startOfWeek} weekArray={weekArray} />
      </div>
      <div className="flex w-full">
        <Week
          date={date}
          weeknumber={params.weeknumber}
          startOfWeek={startOfWeek}
          weekArray={weekArray}
        />
      </div>
    </div>
  );
}
