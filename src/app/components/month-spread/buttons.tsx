"use client";
import { Forward, Backward } from "../../../../public/icons";
import { useRouter } from "next/navigation";

export function PreviousButton(props: { year: number; month: number }) {
  const router = useRouter();
  const currentMonth: number = props.month;
  const currentYear = props.year;

  let nextMonth: number = currentMonth;
  let nextYear: number = currentYear;

  function handleClick() {
    currentMonth == 1
      ? (nextYear--, (nextMonth = 12))
      : ((nextYear = currentYear), nextMonth--);
    router.push(`/dashboard/month-spread/${nextYear}/${nextMonth}`);
  }

  return (
    <button
      onClick={() => handleClick()}
      className="h-6 w-6 mr-5 cursor-pointer"
    >
      <Backward />
    </button>
  );
}

export function NextButton(props: { year: number; month: number }) {
  const router = useRouter();

  const currentMonth: number = props.month;
  const currentYear = props.year;

  let nextMonth: number = currentMonth;
  let nextYear: number = currentYear;

  function handleClick() {
    currentMonth == 12
      ? (nextYear++, (nextMonth = 1))
      : ((nextYear = currentYear), nextMonth++);
    router.push(`/dashboard/month-spread/${nextYear}/${nextMonth}`);
  }
  return (
    <button onClick={handleClick} className="h-6 w-6 ml-5 cursor-pointer">
      <Forward />
    </button>
  );
}
