import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";

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
        // simpan token dan role di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        // console.log(data);
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
    <AuthLayout
      title={
        <>
          Selamat <br className="hidden sm:block" /> Datang di <br />{" "}
          TalentMatch!
        </>
      }
      description="Masuk untuk melanjutkan proses rekrutmen Anda bersama TalentMatch."
      logoVariant="auth"
      showBack={false} // biasanya login nggak butuh tombol back
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-left">Masuk</h2>

      <form
        className="flex flex-col justify-between h-full w-full"
        onSubmit={handleSubmit}
      >
        {/* Form Inputs */}
        <div className="space-y-4">
          <input
            type="email"
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

          <div className="flex justify-end items-center mb-6">
            <Link to="/forgot-password" className="text-blue-600 text-sm font-medium">
              Lupa password?
            </Link>
          </div>
        </div>

        {/* Button & Links */}
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

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="mt-6 text-center text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Daftar
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
