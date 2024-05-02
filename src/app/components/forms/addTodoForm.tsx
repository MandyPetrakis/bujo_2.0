"use client";
import { useState } from "react";
import { createTodo } from "@/app/lib/actions";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

export default function AddTodoForm() {
  type DateValuePiece = Date | null;
  type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

  const [description, setDescription] = useState("");
  const [value, onChange] = useState<DateValue>();

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
      action={createTodo}
      className="text-xs whitespace-nowrap bg-light items-center"
    >
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        name="description"
        className="px-1 block"
        value={description}
      />
      <DatePicker onChange={onChange} value={value} />
      {submitButton}
    </form>
  );
}
