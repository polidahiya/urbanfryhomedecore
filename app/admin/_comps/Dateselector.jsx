"use client";
import React, { useState, useEffect } from "react";

export default function Dateselector({
  label = "Delivered Date",
  state,
  setstate,
}) {
  const [dateValue, setDateValue] = useState("");

  // Sync initial ISO date to datetime-local format
  useEffect(() => {
    if (state) {
      const date = new Date(state);
      const local = date.toISOString().slice(0, 16);
      setDateValue(local);
    }
  }, [state]);

  const handleChange = (e) => {
    const localDate = new Date(e.target.value);
    const isoDate = localDate.toISOString();
    setDateValue(e.target.value);
    setstate(isoDate);
  };

  const formattedDisplayDate = state
    ? new Date(state).toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Not set";

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="datetime-local"
        value={dateValue}
        onChange={handleChange}
        className="border rounded p-2"
      />
      <span className="text-sm text-gray-600">
        Display: {formattedDisplayDate}
      </span>
    </div>
  );
}
