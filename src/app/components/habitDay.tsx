import { fetchDailyHabitsByDayandId } from "../lib/data";

export default async function HabitDay(props: {
  date: Date;
  habit: { id: string; description: string };
}) {
  const habitData = await fetchDailyHabitsByDayandId(
    props.date.toDateString(),
    props.habit.id
  );

  const completed = habitData[0].completed;

  return (
    <div className="font-semibold h-[24px] w-[24px] flex place-content-center items-center">
      {completed ? "X" : null}
    </div>
  );
}
