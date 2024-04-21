import { fetchActiveHabits } from "@/app/lib/data";

export default async function WeekDay(props: {
  day: number;
  dayOfWeek: string;
  month: string;
  date: Date;
}) {
  return (
    <div className="border h-[300px] p-2 mr-2 min-w-fit flex flex-col items-center grow">
      <div className="font-semibold text-sm">{props.dayOfWeek.slice(0, 3)}</div>
      <div className="flex text-xs">
        <p className="mr-2">{props.month}</p>
        <p>{props.day}</p>
      </div>
    </div>
  );
}
