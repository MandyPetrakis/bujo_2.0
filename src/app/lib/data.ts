import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import {
  EventsDisplay,
  HabitsDisplay,
  SleepDisplay,
  TodoDisplay,
  SleepDisplayRange,
  HydrationDisplay,
  Configs,
  DailyHabitsData,
  HydrationRange,
} from "./definitions";
import { getWeek, addWeeks, addDays, getDay, getDaysInYear } from "date-fns";

//date helper funcions

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

export function createYearArray(year: number) {
  const length = getDaysInYear(year);
  const startDate = new Date(`${year}-01-1`);
  return Array.from({ length }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      day: index + 1,
      date: date,
    };
  });
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

// fetch events

export async function fetchEventsByDay(date: string) {
  noStore();

  try {
    const data = await sql<EventsDisplay>`
      SELECT
        events.id,
        events.description,
        events.date,
        events.time,
        events.all_day
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

//fetch habits

export async function fetchHabitsByRange(start_date: string, end_date: string) {
  noStore();

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
  noStore();

  try {
    const data = await sql<DailyHabitsData>`
SELECT
    COALESCE((
        SELECT completed
        FROM daily_habits
        WHERE date = ${date} AND habit_id = ${habit_id}
        LIMIT 1
    ), false) AS completed,
    COALESCE((
        SELECT id
        FROM daily_habits
        WHERE date = ${date} AND habit_id = ${habit_id}
        LIMIT 1
    ), NULL) AS id;
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
  noStore();

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

export async function fetchSleepConfigsByDate(date: string) {
  noStore();

  try {
    const data = await sql<Configs>`
      SELECT 
          bedtime_goal,
          waketime_goal,
          start_date
      FROM 
          configs 
      WHERE 
          start_date = (
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

export async function fetchSleepByDay(date: string) {
  noStore();

  try {
    const data = await sql<SleepDisplay>`
      SELECT
        daily_sleeps.id,
        daily_sleeps.bedtime,
        daily_sleeps.waketime
      FROM daily_sleeps
        WHERE daily_sleeps.date = ${date}
    `;

    const sleepData = data.rows;

    return sleepData;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchSleepDisplayRange(
  start_date: string,
  end_date: string
) {
  noStore();

  try {
    const data = await sql<SleepDisplayRange>`
    SELECT
    MIN(earliest_bedtime) AS earliest_time,
    MAX(latest_waketime) AS latest_time
FROM (
    SELECT
        MIN(COALESCE(configs.bedtime_goal, daily_sleeps.bedtime)) AS earliest_bedtime,
        MAX(COALESCE(configs.waketime_goal, daily_sleeps.waketime)) AS latest_waketime
    FROM
        configs
    LEFT JOIN daily_sleeps ON configs.start_date <= daily_sleeps.date
    WHERE
        configs.start_date = (
            SELECT MAX(start_date)
            FROM configs 
            WHERE start_date < ${start_date}
        )
        OR
        configs.start_date BETWEEN ${start_date} AND ${end_date}
) AS combined_data;
`;
    const sleepDisplayRange = data.rows;

    return sleepDisplayRange;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// fetch hydration

export async function fetchHydrationByDay(date: string) {
  noStore();

  try {
    const data = await sql<HydrationDisplay>`
      SELECT
        daily_hydrations.id,
        daily_hydrations.hydrations
      FROM daily_hydrations
        WHERE daily_hydrations.date = ${date}
    `;

    const hydrationData = data.rows;

    return hydrationData;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchHydrationConfigsByDay(date: string) {
  noStore();

  try {
    const data = await sql<Configs>`
      SELECT 
          hydration_goal, 
          hydration_type,
          start_date
      FROM 
          configs 
      WHERE 
          start_date = (
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

export async function fetchHydrationDisplayRange(
  start_date: string,
  end_date: string
) {
  noStore();

  try {
    const data = await sql<HydrationRange>`
    SELECT
        MAX(max_hydration) AS highest_hydration
    FROM (
        SELECT
            GREATEST(
                MAX(configs.hydration_goal), 
                MAX(daily_hydrations.hydrations)
            ) AS max_hydration
        FROM
            (
                SELECT MAX(start_date) AS start_date
                FROM configs
                WHERE start_date < ${start_date}
                ORDER BY start_date DESC
              LIMIT 1
            ) AS latest_config
        LEFT JOIN configs ON latest_config.start_date = configs.start_date
        LEFT JOIN daily_hydrations ON daily_hydrations.date BETWEEN ${start_date} AND ${end_date}
    ) AS hydration_data;

    `;
    const hydrationRange = data.rows;
    return hydrationRange;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
