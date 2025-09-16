import { useState } from "react";

interface TimePickerCustomProps {
  label: string;
  value?: string;
  onChange: (time: string) => void;
}

export default function TimePickerCustom({ label, value, onChange }: TimePickerCustomProps) {
  const [hour, setHour] = useState(value ? value.split(":")[0] : "00");
  const [minute, setMinute] = useState(value ? value.split(":")[1] : "00");

  const handleChange = (h: string, m: string) => {
    const formatted = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
    onChange(formatted);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="flex gap-2">
        {/* Hour */}
        <select
          value={hour}
          onChange={(e) => {
            setHour(e.target.value);
            handleChange(e.target.value, minute);
          }}
          className="w-1/2 px-3 py-2 border rounded-lg text-sm"
        >
          {Array.from({ length: 24 }).map((_, h) => (
            <option key={h} value={String(h).padStart(2, "0")}>
              {String(h).padStart(2, "0")}
            </option>
          ))}
        </select>

        {/* Minute */}
        <select
          value={minute}
          onChange={(e) => {
            setMinute(e.target.value);
            handleChange(hour, e.target.value);
          }}
          className="w-1/2 px-3 py-2 border rounded-lg text-sm"
        >
          {Array.from({ length: 60 }).map((_, m) => (
            <option key={m} value={String(m).padStart(2, "0")}>
              {String(m).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
