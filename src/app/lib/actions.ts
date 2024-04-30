"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Schemas

const DailyHabitSchema = z.object({
  id: z.string(),
  habit_id: z.string(),
  completed: z.string(),
  date: z.string(),
});

const ToDoSchema = z.object({
  user_id: z.string(),
  due_date: z.string(),
  completed_date: z.string(),
  id: z.string(),
  description: z.string(),
  complete: z.string(),
});

//create and update daily_habits
const CreateDailyHabit = DailyHabitSchema.omit({ id: true, completed: true });

export async function createDailyHabit(formData: FormData) {
  const { habit_id, date } = CreateDailyHabit.parse({
    habit_id: formData.get("habit_id"),
    date: formData.get("date"),
  });
  const completed = true;

  await sql`
  INSERT INTO daily_habits (habit_id, completed, date)
  VALUES (${habit_id}, ${completed}, ${date})
  `;

  revalidatePath("/dashboard");
}

const UpdateDailyHabit = DailyHabitSchema.omit({ date: true, habit_id: true });

export async function updateDailyHabit(formData: FormData) {
  const { completed, id } = UpdateDailyHabit.parse({
    completed: formData.get("completed"),
    id: formData.get("id"),
  });
  const updatedCompleted = !completed;

  await sql`
  UPDATE daily_habits
  SET completed = ${updatedCompleted}
  WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
}

// complete to_do

const CompletedToDo = ToDoSchema.omit({
  user_id: true,
  due_date: true,
  completed_date: true,
  description: true,
});

export async function completeToDo(formData: FormData) {
  console.log(formData);
  const { id, complete } = CompletedToDo.parse({
    id: formData.get("id"),
    complete: formData.get("complete"),
  });
  const completedDate = new Date().toDateString();
  const updatedCompleted = !complete;

  await sql`
  UPDATE todos
  SET complete =  ${updatedCompleted}, completed_date = ${completedDate}
  WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
}
