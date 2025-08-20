// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

function VerifyEmail() {
//   const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(90); // 1.5 menit = 90 detik
  const [codes, setCodes] = useState(["", "", "", ""]);

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
    // TODO: Call API verifikasi
  };

  const handleResend = () => {
    console.log("Resend verification code");
    setTimer(120); // reset timer
    // TODO: Call API resend
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
    <div className="flex h-screen">
      {/* Left Section */}
      <div
        className="w-[27%] h-full bg-cover bg-bottom flex flex-col items-left px-16 py-16"
        style={{ backgroundImage: "url('/images/auth-left-bg.png')" }}
      >
        <div className="flex flex-col items-start">
          {/* <div className="bg-white text-blue-600 font-bold px-2 py-1 rounded mb-4">
            TALENT <span className="text-black">MATCH</span>
          </div> */}
          <img src="/images/logo.png" alt="Logo" className="w-40 h-auto mb-6" />
          <h1 className="text-3xl font-bold leading-snug text-left text-white">
            Daftar & <br /> Mulai Proses <br /> Rekrutmen <br /> Segera!
          </h1>
          <p className="mt-6 text-left text-sm text-white">
            Perlu tenaga kerja harian yang andal di bidangnya? Daftar sekarang
            dan temukan kandidat terbaik Anda hanya di Talentmatch.
          </p>
        </div>
        {/* <img src="/images/logo.png" alt="Logo" className="w-40 h-auto" /> */}
      </div>

      {/* Right Section */}
      <div
        className="w-[73%] h-full flex flex-col items-center bg-cover bg-bottom px-8 py-16 sm:px-16"
        style={{ backgroundImage: "url('/images/auth-right-bg.png')" }} // export dari figma
      >
        <div className="w-[60%] flex-1 flex flex-col mx-auto">
          {/* Back Button */}
          <button className="mb-6">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Form */}
          <h2 className="text-2xl font-bold mb-6 text-left">
            Buat akun perusahaan
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full w-full"
          >
            {/* Form Inputs */}
            {/* OTP Inputs */}
            <div>
              <div className="flex gap-3 w-full justify-beetwen">
                {codes.map((code, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="flex-1 max-w-[120px] h-14 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Button & Register Link (selalu di bawah) */}
            <div className="mb-10">
              <button
                type="submit"
                onClick={handleSubmit}
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
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
