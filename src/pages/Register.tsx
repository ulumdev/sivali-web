import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Register() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div
        className="h-56 sm:h-64 md:h-auto lg:w-[27%] w-full 
                   bg-cover bg-bottom flex flex-col 
                   items-center justify-center 
                   lg:items-start lg:justify-start 
                   px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
        style={{ backgroundImage: "url('/images/auth-left-bg.png')" }}
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-32 sm:w-40 h-auto mb-6"
          />
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
            Daftar & <br className="hidden sm:block" /> Mulai Proses <br />{" "}
            Rekrutmen <br className="hidden sm:block" /> Segera!
          </h1>
          <p className="hidden lg:block mt-4 sm:mt-6 text-sm text-white max-w-sm">
            Perlu tenaga kerja harian yang andal di bidangnya? <br />
            Daftar sekarang dan temukan kandidat terbaik Anda hanya di{" "}
            <span className="font-semibold">TalentMatch</span>.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex-1 h-full flex flex-col items-center 
                   bg-cover bg-bottom 
                   px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
        style={{ backgroundImage: "url('/images/auth-right-bg.png')" }}
      >
        <div className="w-full max-w-md flex-1 flex flex-col">
          {/* Back Button */}
          <button className="mb-6 self-start">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Form */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-left">
            Buat akun perusahaan
          </h2>
          <form className="flex flex-col justify-between h-full w-full">
            {/* Form Inputs */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Nama Perusahaan"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Button & Register Link */}
            <div className="mt-8">
              <p className="mt-6 text-left text-sm mb-6">
                Dengan ini saya menyetujui{" "}
                <Link to="" className="text-blue-600 font-semibold">
                  Ketentuan Layanan
                </Link>{" "}
                dan{" "}
                <Link to="" className="text-blue-600 font-semibold">
                  Kebijakan Privasi
                </Link>{" "}
                dari Talentmatch
              </p>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold transition"
              >
                Daftar
              </button>
              <p className="mt-6 text-center text-sm">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-blue-600 font-semibold">
                  Masuk
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
