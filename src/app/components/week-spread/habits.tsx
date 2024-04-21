import { fetchActiveHabits } from "@/app/lib/data";
import { daysToWeeks } from "date-fns";

export default async function Habits(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const month = props.startOfWeek.getMonth();
  const year = props.startOfWeek.getFullYear();

  const habits = await fetchActiveHabits(year, month + 1);

  const habitRender = habits.map((habit) => {
    const week = props.weekArray.map((day) => {
      //convert dates_completed and day.date to string for comparison
      const completedString = habit.dates_completed.map((date) =>
        date.toString()
      );
      const date = new Date(day.date).toString();
      const completed = completedString.includes(date);

      return (
        <div key={day.day} className="flex ">
          <div
            key={day.day}
            className="border-t last:border-b border-l border-medium font-semibold h-[24px] w-[24px] flex place-content-center items-center"
          >
            {completed ? "X" : null}
          </div>
        </div>
      );
    });
    return (
      <div key={habit.id} className=" border-medium">
        <div className="-rotate-45 whitespace-nowrap w-[5px] text-xs">
          {habit.description}
        </div>
        <div className="border-r border-medium">{week}</div>
      </div>
    );
  });

  return <div className="flex pt-16">{habitRender}</div>;
}
