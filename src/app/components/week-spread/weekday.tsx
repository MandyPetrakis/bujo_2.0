export default function WeekDay(props: {
  date: number;
  dayOfWeek: string;
  month: string;
}) {
  return (
    <div className="border h-[300px] p-5 mr-5 w-[200px] flex flex-col items-center">
      <div className="font-semibold">{props.dayOfWeek}</div>
      <div className="flex text-sm">
        <p className="mr-2">{props.month}</p>
        <p>{props.date}</p>
      </div>
    </div>
  );
}
