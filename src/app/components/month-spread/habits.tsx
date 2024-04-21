import { createMonthArray, fetchActiveHabits } from "@/app/lib/data";

export default async function Habits(props: { year: number; month: number }) {
  const habits = await fetchActiveHabits(props.year, props.month);

  const habitRender = habits.map((habit) => {
    const monthArray = createMonthArray(props.year, props.month).map((day) => {
      //convert dates_completed and day.date to string for comparison
      const completedString = habit.dates_completed.map((date) =>
        date.toString()
      );
      const date = new Date(day.date).toString();
      const completed = completedString.includes(date);

      return (
        <div
          key={day.day}
          className="border-t last:border-b border-l border-medium font-semibold h-[24px] w-[24px] flex place-content-center items-center"
        >
          {completed ? "X" : null}
        </div>
      );
    });
    return (
      <div className=" border-medium" key={habit.id}>
        <div className="-rotate-45 whitespace-nowrap w-[5px] text-xs">
          {habit.description}
        </div>
        <div className="">{monthArray}</div>
      </div>
    );
  });

  return <div className="flex">{habitRender}</div>;
}
