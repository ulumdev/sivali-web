import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/auth/company/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // simpan token di localStorage
        localStorage.setItem("token", data.token);
        // redirect ke halaman dashboard (atau sesuai kebutuhan)
        // navigate("/");
        // redirect ke dashboard dengan refresh penuh
        window.location.href = "/";
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

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
            Selamat <br /> Datang di <br /> TalentMatch!
          </h1>
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
          <h2 className="text-2xl font-bold mb-6 text-left">Masuk</h2>
          <form
            className="flex flex-col justify-between h-full w-full"
            onSubmit={handleSubmit}
          >
            {/* Form Inputs */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 text-sm font-medium"
                >
                  Lupa Password?
                </Link>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Error Message */}
            {/* Button & Register Link (selalu di bawah) */}
            <div className="mb-10">
              <button
                type="submit"
                disabled={loading || !email || !password}
                className={`w-full py-2 rounded-full font-semibold transition ${
                  loading || !email || !password
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Loading..." : "Masuk"}
              </button>
              <p className="mt-6 text-center text-sm">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-600 font-semibold">
                  Daftar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
