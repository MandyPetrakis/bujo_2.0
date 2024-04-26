import { sql, createPool } from "@vercel/postgres";
import { v4 as uuidv4, validate } from "uuid";

import {
  EventsDisplay,
  HabitsDisplay,
  SleepDisplay,
  TodoDisplay,
  HydrationDisplay,
  Configs,
  ConfigHabits,
  DailyHabitsData,
} from "./definitions";
import { getWeek, addWeeks, addDays, getDay } from "date-fns";

// function stringToUUID(string: string) {
//   if (validate(string)) {
//     return string; // Already a valid UUID, no conversion needed
//   } else {
//     // Generate UUID based on the string
//     const uuid = uuidv4(string);
//     return uuid;
//   }
// }

//date helper funcions

const pool = createPool({
  connectionString:
    "postgres://default:AcKPLl4j9Efd@ep-restless-lab-a4ov31n9-pooler.us-east-1.aws.neon.tech:5432/verceldb",
});

export function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return { month, date, year };
}

export function getDisplayMonth(month: number) {
  const displayMonth = month - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[displayMonth];
}

export function getDaysInMonth(year: number, month: number) {
  const daysInMonth: number = new Date(year, month, 0).getDate();
  return daysInMonth;
}

export function getDayOfWeek(year: number, month: number, day: number) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(`${year}-${month}-${day}`);
  return daysOfWeek[date.getDay()];
}

export function createMonthArray(year: number, month: number) {
  const length = getDaysInMonth(year, month);
  return Array.from({ length }, (_, index) => {
    const date = new Date(`${year}-${month}-${index + 1}`);
    return {
      day: index + 1,
      dayOfWeek: getDayOfWeek(year, month, index + 1),
      date: date,
    };
  });
}

//week date helpers

export function getWeekNumber(date: Date) {
  const weekNumber = getWeek(date);
  return weekNumber;
}

export function getDateOfWeek(week: number, year: number) {
  const janOne = new Date(year, 0, 1);
  const date: Date = addWeeks(janOne, week - 1);
  return date;
}

export function createWeekArray(startDate: Date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const length = 7;
  return Array.from({ length }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      dayOfWeek: daysOfWeek[getDay(date)],
      day: date.getDate(),
      month: getDisplayMonth(date.getMonth() + 1),
      date: date,
    };
  });
}
// fetch events

// export async function fetchEventsByMonth(year: number, month: number) {
//   //   noStore();

//   const daysInMonth: number = new Date(year, month, 0).getDate();
//   const start = `${year}-${month}-01`;
//   const end = `${year}-${month}-${daysInMonth}`;

//   try {
//     const data = await sql<EventsDisplay>`
//       SELECT
//         events.id,
//         events.description,
//         events.date
//       FROM events
//       WHERE events.date BETWEEN ${start} AND ${end};
//     `;
//     const events = data.rows;

//     return events;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch events.");
//   }
// }

export async function fetchEventsByDay(date: string) {
  try {
    const data = await sql<EventsDisplay>`
      SELECT
        events.id,
        events.description,
        events.date
      FROM events
        WHERE events.date = ${date};
    `;

    const events = data.rows;

    return events;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

//fetch current configs

export async function fetchConfigsByDay(date: string) {
  try {
    const data = await sql<Configs>`
    SELECT *
    FROM configs 
    WHERE start_date = (
      SELECT MAX(start_date)
      FROM configs 
      WHERE start_date < ${date}
    )
    `;

    const configs = data.rows;
    return configs;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchHabitsByRange(start_date: string, end_date: string) {
  try {
    const data = await sql<HabitsDisplay>`
      SELECT DISTINCT habits.*
      FROM configs
      JOIN config_habits ON configs.id = config_habits.config_id
      JOIN habits ON config_habits.habit_id = habits.id
      WHERE configs.start_date <= ${end_date} AND configs.start_date >= (
          SELECT MAX(start_date)
          FROM configs 
          WHERE start_date < ${start_date}
      )
      UNION
      SELECT DISTINCT habits.*
      FROM configs
      JOIN config_habits ON configs.id = config_habits.config_id
      JOIN habits ON config_habits.habit_id = habits.id
      WHERE configs.start_date < ${end_date} AND configs.start_date > ${start_date};
    `;

    const habits = data.rows;
    return habits;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchDailyHabitsByDayandId(
  date: string,
  habit_id: string
) {
  try {
    const data = await sql<DailyHabitsData>`
    SELECT
    COALESCE((
        SELECT completed
        FROM daily_habits
        WHERE date = ${date} AND habit_id = ${habit_id}
        LIMIT 1
    ), false) AS completed;
    `;
    const completed = data.rows;
    return completed;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

//fetch todos
export async function fetchIncompleteToDos() {
  try {
    const data = await sql<TodoDisplay>`
      SELECT
        todos.id,
        todos.description,
        todos.complete,
        todos.due_date,
        todos.completed_date
      FROM todos
        WHERE todos.complete = false
    `;

    const todos = data.rows;

    return todos;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

//fetch sleep
export async function fetchSleepByDay(date: string) {
  try {
    const data = await sql<SleepDisplay>`
      SELECT
        sleep.id,
        sleep.date,
        sleep.bed_time,
        sleep.wake_up_time
      FROM sleep
        WHERE sleep.date = ${date}
    `;

    const sleepData = data.rows;

    return sleepData;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// fetch hydration

export async function fetchHydrationByDay(date: string) {
  try {
    const data = await sql<HydrationDisplay>`
      SELECT
        hydration.id,
        hydration.date,
        hydration.units
      FROM hydration
        WHERE hydration.date = ${date}
    `;

    const hydrationData = data.rows;

    return hydrationData;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
