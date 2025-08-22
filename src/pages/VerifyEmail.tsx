// import { useState, useEffect } from "react";
// import { ArrowLeft } from "lucide-react";

// function VerifyEmail() {
//   const [timer, setTimer] = useState(90); // 1.5 menit = 90 detik
//   const [codes, setCodes] = useState(["", "", "", ""]);

//   // Countdown timer
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const handleChange = (value: string, index: number) => {
//     if (value.length > 1) return; // hanya 1 digit
//     const newCodes = [...codes];
//     newCodes[index] = value;
//     setCodes(newCodes);

//     // auto fokus ke input berikutnya
//     if (value !== "" && index < codes.length - 1) {
//       const nextInput = document.getElementById(`code-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const code = codes.join("");
//     console.log("Verification Code:", code);
//   };

//   const handleResend = () => {
//     console.log("Resend verification code");
//     setTimer(120); // reset timer
//   };

//   // Format timer jadi mm:ss
//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const isComplete = codes.every((c) => c !== "");

//   return (
//     <div className="flex flex-col lg:flex-row h-screen">
//       {/* Left Section (sembunyikan di mobile) */}
//       <div
//         className="h-56 sm:h-64 md:h-auto lg:w-[27%] w-full
//                   bg-cover bg-bottom flex flex-col
//                   items-center justify-center
//                   lg:items-start lg:justify-start
//                   px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
//         style={{ backgroundImage: "url('/images/auth-left-bg.png')" }}
//       >
//         <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
//           <img src="/images/logo.png" alt="Logo" className="w-36 h-auto mb-6" />
//           <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
//             Daftar & <br className="hidden sm:block" /> Mulai Proses <br />{" "}
//             Rekrutmen <br className="hidden sm:block" /> Segera!
//           </h1>
//           <p className="hidden lg:block mt-4 sm:mt-6 text-sm text-white max-w-sm">
//             Perlu tenaga kerja harian yang andal di bidangnya? <br />
//             Daftar sekarang dan temukan kandidat terbaik Anda hanya di{" "}
//             <span className="font-semibold">TalentMatch</span>.
//           </p>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div
//         className="flex-1 h-full flex flex-col items-center bg-cover bg-bottom px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
//         style={{ backgroundImage: "url('/images/auth-right-bg.png')" }}
//       >
//         <div className="w-full max-w-md flex-1 flex flex-col">
//           {/* Back Button */}
//           <button className="mb-6">
//             <ArrowLeft className="w-6 h-6 text-gray-700" />
//           </button>

//           {/* Form */}
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-left">
//             Buat akun perusahaan
//           </h2>
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col justify-between h-full w-full"
//           >
//             {/* OTP Inputs */}
//             <div>
//               <div className="flex gap-3 justify-between">
//                 {codes.map((code, index) => (
//                   <input
//                     key={index}
//                     id={`code-${index}`}
//                     type="text"
//                     maxLength={1}
//                     value={code}
//                     onChange={(e) => handleChange(e.target.value, index)}
//                     className="w-14 sm:w-16 h-14 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 ))}
//               </div>

//               {/* Countdown / Resend */}
//               <div className="mt-3">
//                 {timer > 0 ? (
//                   <p className="text-sm text-gray-500">
//                     Kirim ulang kode dalam {formatTime(timer)}
//                   </p>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={handleResend}
//                     className="text-blue-600 text-sm font-semibold hover:underline"
//                   >
//                     Kirim ulang kode
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Button */}
//             <div className="mt-8">
//               <button
//                 type="submit"
//                 disabled={!isComplete}
//                 className={`w-full py-3 rounded-full text-white font-semibold transition ${
//                   isComplete
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Verifikasi
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifyEmail;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";

function VerifyEmail() {
  const [timer, setTimer] = useState(90); // 1.5 menit = 90 detik
  const [codes, setCodes] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return; // hanya 1 digit
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // auto fokus ke input berikutnya
    if (value !== "" && index < codes.length - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = codes.join("");
    console.log("Verification Code:", code);
  };

  const handleResend = () => {
    console.log("Resend verification code");
    setTimer(120); // reset timer
  };

  // Format timer jadi mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isComplete = codes.every((c) => c !== "");

  return (
    <AuthLayout
      title={
        <>
          Daftar & <br className="hidden sm:block" /> Mulai Proses <br />{" "}
          Rekrutmen <br className="hidden sm:block" /> Segera!
        </>
      }
      description="Perlu tenaga kerja harian yang andal di bidangnya? Daftar sekarang dan temukan kandidat terbaik Anda hanya di TalentMatch."
      logoVariant="auth"
      showBack={true}
      onBack={() => navigate(-1)} // <-- ini bikin tombol back jalan
    >
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-left">
        Verifikasi
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full w-full"
      >
        {/* OTP Inputs */}
        <div>
          <div className="flex gap-3 justify-between">
            {codes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-14 sm:w-16 h-14 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Countdown / Resend */}
          <div className="mt-3">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Kirim ulang kode dalam {formatTime(timer)}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Kirim ulang kode
              </button>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={!isComplete}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              isComplete
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Verifikasi
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default VerifyEmail;
