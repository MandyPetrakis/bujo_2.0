import { sql } from "@vercel/postgres";
import { EventsDisplay } from "./definitions";

//date helper funcions

export function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return { month, date, year };
}

export function updateDate() {}

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

export async function fetchEventsByMonth(year: number, month: number) {
  //   noStore();

  const daysInMonth: number = new Date(year, month, 0).getDate();
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-${daysInMonth}`;

  try {
    const data = await sql<EventsDisplay>`
      SELECT
        events.id,
        events.description,
        events.date
      FROM events
      WHERE events.date BETWEEN ${start} AND ${end};
    `;
    const events = data.rows;

    return events;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch events.");
  }
}

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

export function createCalendar(year: number, month: number) {
  const length = getDaysInMonth(year, month);
  return Array.from({ length }, (_, index) => {
    const date = new Date(`${year}-${month}-${index + 1}`).toDateString();
    return {
      day: index + 1,
      dayOfWeek: getDayOfWeek(year, month, index + 1),
      date: date,
    };
  });
}
