import { createDailyHabit, updateDailyHabit } from "../lib/actions";
import { fetchDailyHabitsByDayandId } from "../lib/data";
import UpdateHabit from "./updateHabit";
export default async function HabitDay(props: {
  date: Date;
  habit: { id: string; description: string };
}) {
  const habitData = await fetchDailyHabitsByDayandId(
    props.date.toDateString(),
    props.habit.id
  );

  let completed = habitData[0].completed;
  const id = habitData[0].id;

  return (
    <form
      action={habitData[0].id === null ? createDailyHabit : updateDailyHabit}
      key={props.date.toDateString()}
      className="h-[24px] w-[24px] flex"
    >
      <UpdateHabit completed={completed} />
      <input
        type="radio"
        name="completed"
        value="completed"
        className="hidden"
        checked={completed}
      />
      <input
        className="hidden"
        type="text"
        name="habit_id"
        value={props.habit.id}
      />
      <input
        className="hidden"
        type="text"
        name="date"
        value={props.date.toDateString()}
      />
      <input className="hidden" type="text" name="id" value={id} />
    </form>
  );
}
