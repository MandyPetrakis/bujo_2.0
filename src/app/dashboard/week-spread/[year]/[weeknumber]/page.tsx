import Week from "@/app/components/week-spread/week";
import { getDateOfWeek } from "@/app/lib/data";
import Todos from "@/app/components/month-spread/todos";
export default function WeekSpread({
  params,
}: {
  params: { year: number; weeknumber: number };
}) {
  const date = getDateOfWeek(params.weeknumber, params.year);

  return (
    <div className="pt-10 pb-5 h-screen w-full">
      <div className="">Week {params.weeknumber}</div>
      <div className="h-1/2 mb-10">
        <Todos />
      </div>
      <div className="flex w-full">
        <Week date={date} weeknumber={params.weeknumber} />
      </div>
    </div>
  );
}
