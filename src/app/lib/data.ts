import { sql } from "@vercel/postgres";
import { EventsDisplay } from "./definitions";

export function getDate() {
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
  const today = new Date();
  const month = today.getMonth() + 1;
  const displayMonth = months[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  return { month, date, year, displayMonth };
}

export async function fetchEventsByMonth(month: number, year: number) {
  //   noStore();

  const daysInMonth: number = new Date(2024, month, 0).getDate();
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
