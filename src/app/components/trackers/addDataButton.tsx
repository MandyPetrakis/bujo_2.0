"use client";
import { useState } from "react";
import AddSleepForm from "../forms/addSleepForm";
import AddHydrationForm from "../forms/addHydrationForm";
import AddTodoForm from "../forms/addTodoForm";
import clsx from "clsx";

export default function AddDataButton(props: {
  hasId: string;
  date: Date;
  type: string;
}) {
  const [addingData, setAddingData] = useState(false);

  if (addingData && props.type === "sleep") {
    return <AddSleepForm hasId={props.hasId} date={props.date} />;
  }

  if (addingData && props.type === "hydration") {
    return <AddHydrationForm hasId={props.hasId} date={props.date} />;
  }

  if (addingData && props.type === "todo") {
    return <AddTodoForm />;
  }

  return (
    <div
      onClick={() => setAddingData(true)}
      className={clsx("invisible group-hover:visible absolute bg-light", {
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
