"use client";
import { useState } from "react";
import { createEvent } from "@/app/lib/actions";

export default function AddEventForm(props: { date: Date }) {
  const [formData, setFormData] = useState({
    description: "",
    all_day: false,
    time: 0,
  });

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
      action={createEvent}
      className="h-[24px] text-xs whitespace-nowrap bg-light items-center"
    >
      <input
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        type="text"
        name="description"
        value={formData.description}
      />
      <div className="flex mt-1">
        <label className="mr-1">All Day</label>
        <input
          className="mr-1"
          type="checkbox"
          name="all_day"
          id="all_day"
          checked={formData.all_day}
          onChange={() => {
            if (!formData.all_day == true) {
              setFormData({ ...formData, all_day: !formData.all_day, time: 0 });
            } else setFormData({ ...formData, all_day: !formData.all_day });
          }}
        />
        <div className="w-[90px]">
          {formData.all_day ? null : (
            <>
              <label className="mr-1">Time</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, time: parseInt(e.target.value) })
                }
                type="number"
                name="time"
                value={formData.time}
                className="w-9 px-1 mr-2"
              />
            </>
          )}
        </div>
        {submitButton}
        <input
          readOnly
          type="text"
          name="date"
          value={props.date.toDateString()}
          className="invisible h-0 w-0 "
        />
      </div>
    </form>
  );
}
