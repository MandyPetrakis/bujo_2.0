import clsx from "clsx";
import { fetchSleepByDay } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

export default async function SleepDay(props: {
  date: Date;
  length: number;
  startTime: number;
}) {
  revalidatePath("page");
  const startTime = props.startTime;
  const sleepData = await fetchSleepByDay(props.date.toDateString());
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

    return (
      <div
        key={props.startTime + index}
        className={clsx("h-[12px] w-5", {
          "bg-dark":
            (bed_time <= hour && hour > 20 && bed_time != 0) ||
            (wake_up_time >= hour && hour < 21 && wake_up_time != 0),
        })}
      ></div>
    );
  });

  return (
    <div
      key={props.date.toDateString()}
      className="flex  pl-10 h-[24px] place-content-center"
    >
      {hours}
      <p className="flex place-content-center text-sm h-[24px] "></p>
    </div>
  );
}
