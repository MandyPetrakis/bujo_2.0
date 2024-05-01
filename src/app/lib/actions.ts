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

const DailyTrackingSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  date: z.string(),
  hydration: z.number(),
  bedtime: z.string(),
  waketime: z.string(),
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

//add sleep data
const CreateSleepData = DailyTrackingSchema.omit({
  user_id: true,
  id: true,
  hydration: true,
});

export async function createSleepTracking(formData: FormData) {
  const { bedtime, waketime, date } = CreateSleepData.parse({
    bedtime: formData.get("bedtime"),
    waketime: formData.get("waketime"),
    date: formData.get("date"),
  });

  const user_id = "410544b2-4001-4271-9855-fec4b6a6442a";
  const hydration = 0;

  await sql`
  INSERT INTO daily_trackings (bedtime, waketime, date, user_id, hydration)
  VALUES (${bedtime}, ${waketime}, ${date}, ${user_id}, ${hydration})
  `;

  revalidatePath("/dashboard");
}

const UpdateSleepData = DailyTrackingSchema.omit({
  user_id: true,
  hydration: true,
  date: true,
});

export async function updateSleepTracking(formData: FormData) {
  const { bedtime, waketime, id } = UpdateSleepData.parse({
    bedtime: formData.get("bedtime"),
    waketime: formData.get("waketime"),
    id: formData.get("id"),
  });

  await sql`
  UPDATE daily_habits
  SET bedtime = ${bedtime}, waketime = ${waketime}
  WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
}
