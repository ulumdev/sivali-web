import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          <img src="/images/logo-auth.png" alt="Logo" className="w-40 h-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
            Selamat <br className="hidden sm:block" /> Datang di <br />{" "}
            TalentMatch!
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex-1 h-full flex flex-col items-center bg-cover bg-bottom px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
        style={{ backgroundImage: "url('/images/auth-right-bg.png')" }}
      >
        <div className="w-full max-w-md flex-1 flex flex-col">
          {/* Back Button */}
          <button className="mb-6 self-start">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Form */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-left">
            Masuk
          </h2>
          <form
            className="flex flex-col justify-between h-full w-full"
            onSubmit={handleSubmit}
          >
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

            <div className="mt-8">
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
