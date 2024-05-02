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

const DailySleepSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  date: z.string(),
  bedtime: z.string(),
  waketime: z.string(),
});

const DailyHydrationSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  date: z.string(),
  hydrations: z.string(),
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

const CreateTodo = ToDoSchema.omit({
  user_id: true,
  completed_date: true,
  complete: true,
  id: true,
});
export async function createTodo(formData: FormData) {
  console.log(formData);
  const { description, due_date } = CreateTodo.parse({
    description: formData.get("description"),
    due_date: formData.get("date"),
  });
  const complete = false;
  const user_id = "410544b2-4001-4271-9855-fec4b6a6442a";
  await sql`
  INSERT INTO todos (description, complete, due_date, user_id)
  VALUES (${description}, ${complete}, ${due_date}, ${user_id})
  `;

  revalidatePath("/dashboard");
}

//add sleep data
const CreateSleepData = DailySleepSchema.omit({
  user_id: true,
  id: true,
});

export async function createSleepTracking(formData: FormData) {
  const { bedtime, waketime, date } = CreateSleepData.parse({
    bedtime: formData.get("bedtime"),
    waketime: formData.get("waketime"),
    date: formData.get("date"),
  });

  const user_id = "410544b2-4001-4271-9855-fec4b6a6442a";

  await sql`
  INSERT INTO daily_sleeps (bedtime, waketime, date, user_id)
  VALUES (${bedtime}, ${waketime}, ${date}, ${user_id})
  `;

  revalidatePath("/dashboard");
}

const UpdateSleepData = DailySleepSchema.omit({
  user_id: true,
  date: true,
});

export async function updateSleepTracking(formData: FormData) {
  const { bedtime, waketime, id } = UpdateSleepData.parse({
    bedtime: formData.get("bedtime"),
    waketime: formData.get("waketime"),
    id: formData.get("id"),
  });

  await sql`
  UPDATE daily_sleeps
  SET bedtime = ${bedtime}, waketime = ${waketime}
  WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
}

//add hydration data
const CreateHydrationData = DailyHydrationSchema.omit({
  user_id: true,
  id: true,
});

export async function createHydrationTracking(formData: FormData) {
  const { hydrations, date } = CreateHydrationData.parse({
    hydrations: formData.get("hydrations"),
    date: formData.get("date"),
  });

  const user_id = "410544b2-4001-4271-9855-fec4b6a6442a";

  await sql`
  INSERT INTO daily_hydrations (hydrations, date, user_id)
  VALUES (${hydrations}, ${date}, ${user_id})
  `;

  revalidatePath("/dashboard");
}

const UpdateHydrationData = DailyHydrationSchema.omit({
  user_id: true,
  date: true,
});

export async function updateHydrationTracking(formData: FormData) {
  const { hydrations, id } = UpdateHydrationData.parse({
    hydrations: formData.get("hydrations"),
    id: formData.get("id"),
  });

  await sql`
  UPDATE daily_hydrations
  SET hydrations = ${hydrations}
  WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
}
