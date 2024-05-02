"use client";
import { useState } from "react";
import {
  createHydrationTracking,
  updateHydrationTracking,
} from "@/app/lib/actions";

export default function AddHydrationForm(props: { hasId: string; date: Date }) {
  const [hydrations, setHydrations] = useState("0");

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
        props.hasId === "false"
          ? createHydrationTracking
          : updateHydrationTracking
      }
      className="flex h-[24px] text-xs whitespace-nowrap absolute bg-light items-center"
    >
      <input
        onChange={(e) => setHydrations(e.target.value)}
        type="text"
        name="hydrations"
        className="w-8 mx-1 px-1"
        value={hydrations}
      />
      <label className="mr-2">oz</label>
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
