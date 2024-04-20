import { fetchEventsByDay } from "@/app/lib/data";

export default async function Day({
  params,
}: {
  params: {
    day: {
      day: number;
      dayOfWeek: string;
      date: Date;
    };
  };
}) {
  const events = await fetchEventsByDay(params.day.date.toDateString());

  const eventsDisplay = events.map((event) => event.description);

  return (
    <div
      className="flex whitespace-nowrap h-[16px] mb-[8px] text-xs border-b border-medium"
      key={params.day.day}
    >
      <div className="w-7 flex font-semibold justify-end mr-1">
        {params.day.day}
      </div>
      <div className="w-5 flex justify-center mr-1">
        {params.day.dayOfWeek.charAt(0)}
      </div>
      <div>{eventsDisplay}</div>
    </div>
  );
}
