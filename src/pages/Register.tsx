import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Register() {
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

            {/* Button & Register Link (selalu di bawah) */}
            <div className="mb-10">
              <p className="mt-6 text-left text-sm mb-6">
                Dengan ini saya menyetujui{" "}
                <Link to="" className="text-blue-600 font-semibold">
                  Ketentuan Layanan
                </Link>
                {" "} dan {" "}
                <Link to="" className="text-blue-600 font-semibold">
                  Kebijakan Privasi
                </Link>
                {" "} dari Talentmatch
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
