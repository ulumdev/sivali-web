import { useState } from "react";

interface TimePickerModalProps {
  label: string;
  value?: string;
  onChange: (time: string) => void;
}

export default function TimePickerModal({ label, value, onChange }: TimePickerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(value ? value.split(":")[0] : "00");
  const [minute, setMinute] = useState(value ? value.split(":")[1] : "00");

  // validasi & format agar selalu 2 digit
  const formatValue = (val: string, max: number) => {
    if (val === "") return "00";
    let num = parseInt(val, 10);
    if (isNaN(num)) return "00";
    if (num < 0) num = 0;
    if (num > max) num = max;
    return num.toString().padStart(2, "0");
  };

  const handleSave = () => {
    const validatedHour = formatValue(hour, 23);
    const validatedMinute = formatValue(minute, 59);
    const formatted = `${validatedHour}:${validatedMinute}`;
    setHour(validatedHour);
    setMinute(validatedMinute);
    onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div
        onClick={() => setIsOpen(true)}
        className="w-full px-3 py-2 border rounded-lg text-sm cursor-pointer bg-white"
      >
        {hour.padStart(2, "0")}:{minute.padStart(2, "0")}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[280px] text-center">
            <h3 className="text-md font-semibold mb-4">{label}</h3>

            {/* Input jam & menit */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                onBlur={(e) => setHour(formatValue(e.target.value, 23))}
                className="w-16 text-center px-2 py-2 border rounded-lg text-lg font-mono"
              />
              <span className="text-lg font-semibold">:</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                onBlur={(e) => setMinute(formatValue(e.target.value, 59))}
                className="w-16 text-center px-2 py-2 border rounded-lg text-lg font-mono"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="w-1/2 py-2 border rounded-lg text-sm hover:bg-gray-100 text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="w-1/2 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 text-sm"
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
