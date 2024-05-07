"use client";
import { useState } from "react";
import clsx from "clsx";
import AddEventForm from "../forms/addEventForm";
import { add } from "date-fns";

export default function AddEventButton(props: { date: Date }) {
  const [addingData, setAddingData] = useState(false);
  if (addingData === true) {
    return <AddEventForm date={props.date} />;
  }
  return (
    <div
      onClick={() => setAddingData(true)}
      className={clsx("invisible group-hover:visible h-5 bg-light", {
        "group-hover:invisible": addingData,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 absolute cursor-pointer "
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
