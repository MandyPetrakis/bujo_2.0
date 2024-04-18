import { fetchEventsByDay } from "@/app/lib/data";

export default async function Day({
  params,
}: {
  params: {
    day: {
      day: number;
      dayOfWeek: string;
      date: string;
    };
  };
}) {
  const events = await fetchEventsByDay(params.day.date);

  const eventsDisplay = events.map((event) => event.description);

  return (
    <div key={params.day.day}>
      {params.day.day}
      {params.day.dayOfWeek.charAt(0)}
      <>{eventsDisplay}</>
    </div>
  );
}
