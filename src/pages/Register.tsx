import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";

function Register() {
  const navigate = useNavigate();

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
    </AuthLayout>
  );
}

export default Register;
