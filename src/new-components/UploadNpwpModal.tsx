import { useState } from "react";
import {X, UploadCloud} from "lucide-react";

type UploadNpwpModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (file: File | null, npwpNumber: string) => void;
    initialFileUrl?: string;
    initialNpwp?: string;
};

export default function UploadNPWPModal({
  open,
  onClose,
  onSubmit,
  initialFileUrl,
  initialNpwp,
}: UploadNpwpModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialFileUrl || null);
  const [npwpNumber, setNpwpNumber] = useState(initialNpwp || "");

  if (!open) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) {
        setFile(f);
        setPreview(URL.createObjectURL(f));
      }
    };

    const resetForm = () => {
      setFile(null);
      setPreview(null);
      setNpwpNumber("");
    };

    const handleClose = () => {
      resetForm();
      onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(file, npwpNumber);
      resetForm();
      onClose();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-start">NPWP</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Upload Area */}
          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Klik untuk unggah</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <img
                src={preview}
                alt="NPWP Preview"
                className="w-28 h-20 object-cover rounded border"
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium truncate">
                  {file?.name || "NPWP_Document.jpg"}
                </p>
                <div className="flex gap-4 text-sm mt-1">
                  <a
                    href={preview}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat dokumen
                  </a>
                  <label className="text-blue-600 hover:underline cursor-pointer">
                    Unggah ulang
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Format & Size */}
          <div className="text-sm text-gray-500 flex justify-between pb-4">
            <p className="text-sm text-gray-400">Format: .jpg, .jpeg, .png</p>
            <p className="text-sm text-gray-400">Maksimal ukuran: 2MB</p>
          </div>

          {/* Input NPWP */}
          <input
            type="text"
            placeholder="Masukkan ulang NPWP"
            value={npwpNumber}
            onChange={(e) => setNpwpNumber(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Buttons */}
          <div className="flex flex-row gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!file}
              className={`w-full px-4 py-2 rounded text-sm ${file ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}