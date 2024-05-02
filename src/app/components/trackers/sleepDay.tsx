import clsx from "clsx";
import { fetchSleepByDay, fetchSleepConfigsByDate } from "@/app/lib/data";
import { differenceInHours, subDays } from "date-fns";
import AddDataButton from "./addDataButton";

export default async function SleepDay(props: {
  date: Date;
  length: number;
  startTime: number;
}) {
  //sets values for sleep time goals to 0 in case the user doesn't set them in configs
  let bedtime_goal = 0;
  let waketime_goal = 0;
  let hasId = "false";

  //fetch user sleep configs by day in the event the user updated them during the week
  const sleepConfigs = await fetchSleepConfigsByDate(props.date.toDateString());

  //sets sleep time goals from user configs if data is returned
  if (sleepConfigs.length != 0) {
    bedtime_goal = sleepConfigs[0].bedtime_goal;
    waketime_goal = sleepConfigs[0].waketime_goal;
  }
  //fetched sleep data for each day in the past
  let sleepData: { id: string; bedtime: number; waketime: number }[] = [];
  if (props.date.toDateString() >= new Date().toDateString()) {
    sleepData = await fetchSleepByDay(props.date.toDateString());
  }
  //sets start time and length for sleep hours from props
  const startTime = props.startTime;
  const length = props.length;

  //creates an array the lenth of the sleep hours and returns sleep data visualized for each hour
  const hours = Array.from({ length }, (_, index) => {
    let hour;

    //adjusts display hours based to 12 hours settings
    if (startTime + index > 24) {
      hour = startTime + index - 24;
    } else hour = startTime + index;

    //initiates bed time and wake up time to 0 in case there is no data for the day
    let bed_time = 0;
    let wake_up_time = 0;

    //if data for the day is returned, sleep times are updated
    if (sleepData.length !== 0) {
      bed_time = sleepData[0].bedtime;
      wake_up_time = sleepData[0].waketime;
      hasId = sleepData[0].id;
    }

    return (
      //returns a parent div for each hour with the border to indicate sleep goals
      //returns a child div with the background set to dark if the user was sleep during that time.
      <div
        key={index}
        className={clsx("w-5", {
          "border-l border-medium":
            hour == bedtime_goal || hour == waketime_goal,
        })}
      >
        {sleepData.length !== 0 ? (
          <div
            className={clsx("h-[12px]", {
              "bg-dark":
                (bed_time <= hour && hour > 20 && bed_time != 0) ||
                (wake_up_time > hour && hour < 21 && wake_up_time != 0),
            })}
          ></div>
        ) : null}
      </div>
    );
  });

  return (
    //returns a div containing all the sleep hours and total hours slept per day for each day of the week.
    <div
      key={props.date.toDateString()}
      className="flex h-[24px] place-content-center relative group"
    >
      {hours}
      {hasId !== "false" ? null : (
        <AddDataButton hasId={hasId} date={props.date} type="sleep" />
      )}
      <p className="flex place-content-center text-sm h-[24px] "></p>
    </div>
  );
}
