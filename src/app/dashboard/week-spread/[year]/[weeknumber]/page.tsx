import Week from "@/app/components/week-spread/week";
import { getDateOfWeek } from "@/app/lib/data";

export default function WeekSpread({
  params,
}: {
  params: { year: number; weeknumber: number };
}) {
  const date = getDateOfWeek(params.weeknumber, params.year);

  return (
    <div className="pt-10 pb-5 h-screen">
      <Week date={date} weeknumber={params.weeknumber} />
    </div>
  );
}
