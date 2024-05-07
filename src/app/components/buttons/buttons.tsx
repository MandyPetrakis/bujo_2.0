"use client";
import { Forward, Backward } from "../../../../public/icons";
import { useRouter } from "next/navigation";
import { getISOWeeksInYear } from "date-fns";

export function PreviousButton(props: {
  year: number;
  display: number;
  page: string;
}) {
  const router = useRouter();

  const currentYear = props.year;
  let nextYear: number = currentYear;

  function handleClick() {
    if (props.page === "month") {
      const currentMonth: number = props.display;
      let nextMonth: number = currentMonth;

      currentMonth == 1 ? (nextYear--, (nextMonth = 12)) : nextMonth--;
      router.push(`/dashboard/month-spread/${nextYear}/${nextMonth}`);
    } else if (props.page === "week") {
      const weeksInPreviousYear = getISOWeeksInYear(
        new Date(props.year - 1, 1, 1)
      );
      const currentWeek: number = props.display;
      let nextWeek = currentWeek;

      currentWeek == 1
        ? (nextYear--, (nextWeek = weeksInPreviousYear))
        : nextWeek--;
      router.push(`/dashboard/week-spread/${nextYear}/${nextWeek}`);
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className="h-6 w-6 mr-5 cursor-pointer flex-shrink-0"
    >
      <Backward />
    </button>
  );
}

export function NextButton(props: {
  year: number;
  display: number;
  page: string;
}) {
  const router = useRouter();

  const currentYear = props.year;
  let nextYear: number = currentYear;

  function handleClick() {
    if (props.page == "month") {
      const currentMonth: number = props.display;
      let nextMonth: number = currentMonth;
      currentMonth == 12 ? (nextYear++, (nextMonth = 1)) : nextMonth++;
      router.push(`/dashboard/month-spread/${nextYear}/${nextMonth}`);
    } else if (props.page == "week") {
      const weeksInCurrentYear = getISOWeeksInYear(
        new Date(props.year - 1, 1, 1)
      );
      const currentWeek: number = props.display;
      let nextWeek: number = currentWeek;

      currentWeek == weeksInCurrentYear
        ? (nextYear++, (nextWeek = 1))
        : nextWeek++;
      router.push(`/dashboard/week-spread/${nextYear}/${nextWeek}`);
    }
  }
  return (
    <button
      onClick={handleClick}
      className="h-6 w-6 ml-5 cursor-pointer flex-shrink-0"
    >
      <Forward />
    </button>
  );
}
