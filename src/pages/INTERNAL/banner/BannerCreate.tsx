import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import Swal from "sweetalert2";
import { createBanner } from "@/services/internal/bannerInternalService";

/**
 * BannerCreate - halaman create banner sesuai desain Figma (gambar 1)
 */
export default function BannerCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!imageFile) { setPreview(null); return; }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setImageFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { Swal.fire({ icon: "warning", text: "Judul banner wajib diisi" }); return; }
    if (!imageFile) { Swal.fire({ icon: "warning", text: "Silakan unggah gambar banner" }); return; }

    setSaving(true);
    try {
      await createBanner({ image: imageFile, title: title.trim(), description: description.trim(), isActive });
      Swal.fire({ icon: "success", title: "Sukses", text: "Banner berhasil dibuat" });
      navigate("/internal/banners");
    } catch (err: any) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Gagal", text: err?.message ?? "Terjadi kesalahan" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Tambah Banner</h1>
          <div className="text-sm text-gray-500 mt-1">List Banner &nbsp;›&nbsp; Tambah Banner</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex items-center gap-2">
          <div className="text-base font-medium">Detail Banner</div>
        </div>

        {/* Upload area */}
        <div className="border border-dashed border-gray-300 rounded-lg p-6">
          {!preview ? (
            <label className="cursor-pointer flex flex-col items-center justify-center gap-3 text-center text-gray-500">
              <div className="w-full h-36 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center">
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <div className="text-sm font-medium mt-2">Klik untuk unggah banner</div>
                <div className="text-xs text-gray-400 mt-1">JPG, JPEG, atau PNG (max. 5mb) — rekomendasi ukuran 1179 x 683px</div>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={preview} alt="preview" className="w-56 h-28 object-cover rounded-lg border" />
                <div>
                  <div className="text-sm font-medium">{imageFile?.name ?? "Selected image"}</div>
                  <div className="text-xs text-gray-500 mt-1">Ukuran file: {imageFile ? `${(imageFile.size/1024/1024).toFixed(2)} MB` : "-"}</div>
                </div>
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-blue-600 cursor-pointer">
                Unggah ulang
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Judul Banner <span className="text-red-500">*</span></div>
          <input
            type="text"
            placeholder="Masukkan judul banner"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Content / description with simple toolbar (UI only) */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Isi</div>
          <div className="flex items-center gap-2 mb-2">
            <button type="button" className="px-2 py-1 text-xs border rounded bg-white text-gray-600">H1</button>
            <button type="button" className="px-2 py-1 text-xs border rounded bg-white text-gray-600">H2</button>
            <button type="button" className="px-2 py-1 text-xs border rounded bg-white text-gray-600">B</button>
            <button type="button" className="px-2 py-1 text-xs border rounded bg-white text-gray-600">I</button>
            <button type="button" className="px-2 py-1 text-xs border rounded bg-white text-gray-600">U</button>
          </div>
          <textarea
            placeholder="Masukkan deskripsi banner"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-3 min-h-[120px] text-sm"
          />
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">Tampilkan banner</div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="toggle-checkbox" />
            <span className="text-sm text-gray-600">{isActive ? "Aktif" : "Non-aktif"}</span>
          </label>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => navigate("/internal/banners")} className="flex-1 px-4 py-3 rounded bg-gray-100 text-sm">Batal</button>
          <button type="submit" disabled={saving} className="flex-1 px-4 py-3 rounded bg-blue-600 text-white text-sm">
            {saving ? "Menyimpan..." : "Unggah"}
          </button>
        </div>
      </form>
    </div>
  );
}