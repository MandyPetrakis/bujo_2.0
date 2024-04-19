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
          className="border-t last:border-b border-l border-medium font-semibold h-7 w-10 flex place-content-center"
        >
          {completed ? "X" : null}
        </div>
      );
    });
    return (
      <div className="last-of-type:border-r border-medium" key={habit.id}>
        <div className="-rotate-45 whitespace-nowrap w-5">
          {habit.description}
        </div>
        <div>{monthArray}</div>
      </div>
    );
  });

  return <div className="flex">{habitRender}</div>;
}
