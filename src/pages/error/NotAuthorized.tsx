import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-8">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}