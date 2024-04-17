import { fetchEventsByMonth } from "@/app/lib/data";

export default async function Events() {
  const events = await fetchEventsByMonth(4, 2024);

  return <p>{events[0].description}</p>;
}
