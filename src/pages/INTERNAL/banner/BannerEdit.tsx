import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { UploadCloud } from "lucide-react";
import Swal from "sweetalert2";
import {
  getBannerById,
  updateBanner,
} from "@/services/internal/bannerInternalService";
import type { BannerModel } from "@/models/internal/BannerModel";

/**
 * BannerEdit - halaman edit banner sesuai desain Figma (gambar 2)
 */
export default function BannerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState<BannerModel | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getBannerById(id)
      .then((data) => {
        if (!mounted) return;
        setBanner(data);
        setTitle(data?.title ?? "");
        setDescription(data?.description ?? "");
        setIsActive(Boolean(data?.isActive));
        setPreview(data?.bannerUrl ?? null);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({ icon: "error", text: "Gagal mengambil data banner" });
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!imageFile) return;
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
    if (!title.trim()) {
      Swal.fire({ icon: "warning", text: "Judul banner wajib diisi" });
      return;
    }
    setSaving(true);
    try {
      if (!id) throw new Error("ID tidak ditemukan");
      await updateBanner(id, {
        image: imageFile ?? undefined,
        title: title.trim(),
        description: description.trim(),
        isActive,
      });
      Swal.fire({ icon: "success", text: "Banner berhasil diperbarui" });
      navigate("/internal/banners");
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        text: err?.message ?? "Gagal memperbarui banner",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!banner) return <p className="text-gray-500">Banner tidak ditemukan</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Edit Banner</h1>
          <div className="text-sm text-gray-500 mt-1">
            List Banner &nbsp;›&nbsp; Edit Banner
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border p-6 space-y-6"
      >
        <div className="flex items-center gap-2">
          <div className="text-base font-medium">Detail Banner</div>
        </div>

        {/* Edit: show preview + "Unggah ulang" */}
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {preview ? (
              <img
                src={preview}
                alt={title}
                className="w-56 h-28 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-56 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div>
              <div className="text-sm font-medium">{banner.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {banner.description ?? "-"}
              </div>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-blue-600 cursor-pointer">
            Unggah ulang
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
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

        {/* Isi / editor (UI only) */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Isi</div>
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              className="px-2 py-1 text-xs border rounded bg-white text-gray-600"
            >
              H1
            </button>
            <button
              type="button"
              className="px-2 py-1 text-xs border rounded bg-white text-gray-600"
            >
              H2
            </button>
            <button
              type="button"
              className="px-2 py-1 text-xs border rounded bg-white text-gray-600"
            >
              B
            </button>
            <button
              type="button"
              className="px-2 py-1 text-xs border rounded bg-white text-gray-600"
            >
              I
            </button>
            <button
              type="button"
              className="px-2 py-1 text-xs border rounded bg-white text-gray-600"
            >
              U
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-3 min-h-[120px] text-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">Tampilkan banner</div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              {isActive ? "Aktif" : "Non-aktif"}
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/internal/banners")}
            className="flex-1 px-4 py-3 rounded bg-gray-100 text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-3 rounded bg-blue-600 text-white text-sm"
          >
            {saving ? "Menyimpan..." : "Unggah"}
          </button>
        </div>
      </form>
    </div>
  );
}
