import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { RecentUser } from '../../types/dashboard.types';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface CommunityMapProps {
  users: RecentUser[];
}

const CommunityMap: React.FC<CommunityMapProps> = ({ users }) => {
  // Centered on Kenya coordinates by default (since your types use Ward/Constituency)
  const defaultPosition: [number, number] = [-1.286389, 36.817223]; 

  return (
    <div className="h-[450px] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <MapContainer
        center={defaultPosition}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {users.map((user) => (
          // In a real app, you'd map user.ward/county to lat/lng coordinates.
          // For this example, we assume markers are placed based on regional centroids.
          <Marker key={user.id} position={defaultPosition}> 
            <Popup>
              <div className="p-1">
                <h5 className="font-bold text-gray-900">{user.name}</h5>
                <p className="text-xs text-gray-500 mb-1">{user.phone_number}</p>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full w-fit">
                    {user.county}
                  </span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full w-fit">
                    {user.constituency} | {user.ward}
                  </span>
                </div>
                {user.verified && (
                  <p className="text-[10px] text-green-600 mt-2 font-semibold">✓ Verified Member</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CommunityMap;