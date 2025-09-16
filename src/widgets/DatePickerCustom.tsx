// import { useState } from "react";
// // import { DayPicker } from "react-day-picker";
// import { id } from "date-fns/locale";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { DayPicker, type MonthCaptionProps } from "react-day-picker";
// // import { ChevronLeft, ChevronRight } from "lucide-react";

// interface DatePickerCustomProps {
//   onSelect: (date: Date) => void;
//   onCancel: () => void;
// }

// export default function DatePickerCustom({ onSelect, onCancel }: DatePickerCustomProps) {
//   const [selected, setSelected] = useState<Date | undefined>();

//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-[320px]">
//       <DayPicker
//         mode="single"
//         selected={selected}
//         onSelect={setSelected}
//         locale={id}
//         // ⛔️ Jangan load default CSS
//         styles={{
//           caption: { display: "flex", justifyContent: "space-between", alignItems: "center" },
//           head_row: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)" },
//           row: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)" },
//         }}
//         components={{
//           // Custom caption biar bulan & arrow mirip desain
//           Caption: ({ displayMonth, goToMonth, nextMonth, previousMonth }) => {
//             const month = displayMonth.toLocaleString("id-ID", {
//               month: "long",
//               year: "numeric",
//             });
//             return (
//               <div className="flex items-center justify-between mb-4">
//                 <button
//                   type="button"
//                   onClick={() => previousMonth && goToMonth(previousMonth)}
//                   className="p-1 rounded-md hover:bg-gray-100"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
//                 <span className="font-semibold text-gray-800">{month}</span>
//                 <button
//                   type="button"
//                   onClick={() => nextMonth && goToMonth(nextMonth)}
//                   className="p-1 rounded-md hover:bg-gray-100"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             );
//           },
//         }}
//         classNames={{
//           months: "w-full",
//           month: "space-y-4",
//           table: "w-full border-collapse",
//           head_row: "grid grid-cols-7 text-xs text-gray-400 mb-2",
//           head_cell: "text-center font-medium",
//           row: "grid grid-cols-7 mb-1",
//           cell: "text-center",

//           day: "w-9 h-9 flex items-center justify-center rounded-md text-gray-700 hover:bg-blue-50 cursor-pointer",
//           day_selected:
//             "border border-blue-600 bg-white text-blue-600 font-medium",
//           day_today: "border border-blue-400",
//           day_disabled: "text-gray-300 cursor-not-allowed",
//         }}
//       />

//       {/* Footer Buttons */}
//       <div className="flex justify-between items-center mt-4 gap-2">
//         <button
//           onClick={onCancel}
//           className="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-100 w-1/2"
//         >
//           Batal
//         </button>
//         <button
//           disabled={!selected}
//           onClick={() => selected && onSelect(selected)}
//           className={`px-4 py-2 rounded-lg text-sm font-semibold w-1/2 ${
//             selected
//               ? "bg-blue-600 text-white hover:bg-blue-700"
//               : "bg-gray-200 text-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Pilih
//         </button>
//       </div>
//     </div>
//   );
// }

// function CustomCaption({ calendarMonth, displayIndex, ...props }: MonthCaptionProps) {
//   const date = calendarMonth.date; // Use the Date object directly

//   return (
//     <div className="flex items-center justify-between mb-4" {...props}>
//       <button
//         type="button"
//         onClick={() => props.previousMonth && props.goToMonth(props.previousMonth)}
//         className="p-1 rounded-md hover:bg-gray-100"
//       >
//         <ChevronLeft size={18} />
//       </button>
//       <span className="font-semibold text-gray-800">
//         {date.toLocaleString("id-ID", { month: "long", year: "numeric" })}
//       </span>
//       <button
//         type="button"
//         onClick={calendarMonth.nextMonth}
//         className="p-1 rounded-md hover:bg-gray-100"
//       >
//         <ChevronRight size={18} />
//       </button>
//     </div>
//   );
// }