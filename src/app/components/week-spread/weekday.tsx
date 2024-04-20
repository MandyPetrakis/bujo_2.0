import { fetchActiveHabits } from "@/app/lib/data";

export default async function WeekDay(props: {
  day: number;
  dayOfWeek: string;
  month: string;
  date: Date;
}) {
  const month = props.date.getMonth();
  const year = props.date.getFullYear();
  const habits = await fetchActiveHabits(year, month + 1);

  const dayHabits = habits.map((h) => {
    const completedString = h.dates_completed.map((date) => date.toString());
    const stringDate = props.date.toString();
    const completed = completedString.includes(stringDate);

    return (
      <div key={h.id} className="text-xs flex justify-between">
        {h.description}{" "}
        <div className="border-t last:border-b border-r border-l border-medium text-xs h-[24px] w-[24px] flex place-content-center items-center">
          {completed ? "X" : null}
        </div>
      </div>
    );
  });

  return (
    <div className="border h-[300px] p-2 mr-2 min-w-fit flex flex-col items-center grow">
      <div className="font-semibold text-sm">{props.dayOfWeek.slice(0, 3)}</div>
      <div className="flex text-xs">
        <p className="mr-2">{props.month}</p>
        <p>{props.day}</p>
      </div>
      <div className="border-t">{dayHabits}</div>
    </div>
  );
}
