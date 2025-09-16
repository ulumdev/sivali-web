import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LocationPickerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (location: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number }; // <-- tambahin
}

function LocationSelector({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const latlng = marker.getLatLng();
          setPosition(latlng);
        },
      }}
    />
  ) : null;
}

export default function LocationPickerModal({
  open,
  onClose,
  onConfirm,
  initialPosition,
}: LocationPickerModalProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    initialPosition || { lat: -6.200000, lng: 106.816666 } // default Jakarta
  );

  // 🔑 Sync kalau initialPosition berubah
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[9999]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl rounded-xl bg-white shadow-lg p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Pilih Titik Lokasi
          </Dialog.Title>

          {/* Map Section */}
          <div className="h-[400px] w-full mb-4 rounded-lg overflow-hidden">
            <MapContainer
              center={position || { lat: -6.200000, lng: 106.816666 }}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationSelector position={position} setPosition={setPosition} />
            </MapContainer>
          </div>

          {/* Show Lat Lng */}
          {position && (
            <p className="text-sm text-gray-600 mb-4">
              📍 Latitude: {position.lat.toFixed(6)}, Longitude:{" "}
              {position.lng.toFixed(6)}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="w-1/2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
            >
              Batal
            </button>
            <button
              onClick={() => {
                if (position) onConfirm(position);
                onClose();
              }}
              className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Konfirmasi
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
