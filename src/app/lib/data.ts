import { sql } from "@vercel/postgres";
import { EventsDisplay, HabitsDisplay, TodoDisplay } from "./definitions";
import { getWeek, addWeeks, addDays, getDay } from "date-fns";
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

export function createMonthArray(year: number, month: number) {
  const length = getDaysInMonth(year, month);
  return Array.from({ length }, (_, index) => {
    const date = new Date(`${year}-${month}-${index + 1}`).toDateString();
    return {
      day: index + 1,
      dayOfWeek: getDayOfWeek(year, month, index + 1),
      date: addDays(date, index),
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
      month: getDisplayMonth(date.getMonth()),
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
  //   noStore();

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

//fetch habits

export async function fetchActiveHabits(year: number, month: number) {
  const daysInMonth: number = getDaysInMonth(year, month);
  const date = `${year}-${month}-${daysInMonth}`;
  try {
    const data = await sql<HabitsDisplay>`
      SELECT
        habits.id,
        habits.description,
        habits.dates_completed
      FROM habits
        WHERE habits.active_month < ${date} AND habits.active = true;
    `;

    const habits = data.rows;

    return habits;
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
