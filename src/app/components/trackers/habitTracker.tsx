import HabitDay from "./habitDay";
import { fetchHabitsByRange } from "../../lib/data";

export default async function HabitTracker(props: {
  datesArray: { day: number; date: Date }[];
}) {
  const weekHabits = await fetchHabitsByRange(
    props.datesArray[0].date.toDateString(),
    props.datesArray[props.datesArray.length - 1].date.toDateString()
  );

  const habitDisplay = weekHabits.map((habit) => {
    const week = props.datesArray.map((day) => {
      return (
        <div
          key={day.day}
          className="flex border-t  last:border-b border-l border-medium "
        >
          <HabitDay date={day.date} habit={habit} />
        </div>
      );
    });
    return (
      <div key={habit.id}>
        <div className="-rotate-45 whitespace-nowrap w-[0px] h-0 text-xs ">
          {habit.description}
        </div>
        <div key={habit.id} className="last:border-r border-medium mt-[15px]">
          {week}
        </div>
      </div>
    );
  });

  return (
    <div className="">
      <p className="flex place-content-center text-sm font-semibold mb-5 pb-16">
        Habits
      </p>
      <div className="flex">{habitDisplay}</div>
    </div>
  );
}
