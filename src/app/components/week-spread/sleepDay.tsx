import clsx from "clsx";
import { fetchSleepByDay } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

export default async function SleepDay(props: {
  day: { dayOfWeek: string; day: number; month: string; date: Date };
  length: number;
  startTime: number;
}) {
  revalidatePath("layout");
  const startTime = props.startTime;
  const sleepData = await fetchSleepByDay(props.day.date.toDateString());
  const length = props.length;

  const hours = Array.from({ length }, (_, index) => {
    let hour;

    if (startTime + index > 24) {
      hour = startTime + index - 24;
    } else hour = startTime + index;

    let bed_time = 0;
    let wake_up_time = 0;

    if (sleepData.length != 0) {
      bed_time = parseInt(sleepData[0].bed_time);
      wake_up_time = parseInt(sleepData[0].wake_up_time) - 1;
    }
    console.log(sleepData);
    return (
      <div key={index} className="h-[24px] place-content-center flex">
        <div
          key={props.startTime + index}
          className={clsx("h-3 w-5", {
            "bg-dark":
              (bed_time <= hour && hour > 20 && bed_time != 0) ||
              (wake_up_time >= hour && hour < 21 && wake_up_time != 0),
          })}
        ></div>
      </div>
    );
  });

  return (
    <div key={props.day.day} className="flex items-center pl-10">
      {hours}
      <p className="flex place-content-center text-sm h-[24px] "></p>
    </div>
  );
}
