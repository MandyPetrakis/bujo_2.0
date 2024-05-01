"use client";
import { useState } from "react";
import { createSleepTracking, updateSleepTracking } from "@/app/lib/actions";

export default function AddSleepForm(props: { hasId: string; date: Date }) {
  const [bedtime, setBedtime] = useState("0");
  const [waketime, setWaketime] = useState("0");

  const submitButton = (
    <button type="submit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );

  return (
    <form
      action={
        props.hasId === "false" ? createSleepTracking : updateSleepTracking
      }
      className="flex h-[24px] text-xs whitespace-nowrap absolute bg-light items-center"
    >
      <label>Bedtime:</label>
      <input
        onChange={(e) => setBedtime(e.target.value)}
        type="text"
        name="bedtime"
        className="w-10 mx-1"
        value={bedtime}
      />
      <label>Wake time:</label>
      <input
        onChange={(e) => setWaketime(e.target.value)}
        type="text"
        name="waketime"
        className="w-10 mx-1"
        value={waketime}
      />
      <input
        readOnly
        type="text"
        name="id"
        value={props.hasId}
        className="invisible h-0 w-0"
      />
      <input
        readOnly
        className="invisible h-0 w-0"
        type="text"
        name="date"
        value={props.date.toDateString()}
      />
      {submitButton}
    </form>
  );
}
