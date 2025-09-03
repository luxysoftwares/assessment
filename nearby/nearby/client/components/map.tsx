'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import type { Restaurant } from '@/types/restaurant';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';

interface MapProps {
  center: [number, number];
  radius: number;
  restaurants: Restaurant[];
  userLocation: { lat: number; lng: number };
}

export default function Map({
  center,
  radius,
  restaurants,
  userLocation,
}: MapProps) {
  useEffect(() => {
    // @ts-ignore we are deleting ion the reason is it keep displaying unfound image
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Crandom calcluation instead of having to use third party api
  const calculateTravelTime = (
    start: { lat: number; lng: number },
    end: { lat: number; lng: number },
    mode: 'car' | 'walking'
  ) => {
    const R = 6371;
    const dLat = ((end.lat - start.lat) * Math.PI) / 180;
    const dLon = ((end.lng - start.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((start.lat * Math.PI) / 180) *
        Math.cos((end.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const speeds = { car: 30, walking: 5 };
    return Math.round((distance / speeds[mode]) * 60);
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={center}>
        <Popup>Your Location</Popup>
      </Marker>

      <Circle
        center={center}
        pathOptions={{ fillColor: 'blue', color: 'blue', fillOpacity: 0.1 }}
        radius={radius * 1000}
      />

      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.address}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm">{restaurant.rating}</span>
              </div>
              <div className="text-sm mt-2">
                <div>
                  🚗{' '}
                  {calculateTravelTime(
                    userLocation,
                    { lat: restaurant.latitude, lng: restaurant.longitude },
                    'car'
                  )}{' '}
                  min
                </div>
                <div>
                  🚶{' '}
                  {calculateTravelTime(
                    userLocation,
                    { lat: restaurant.latitude, lng: restaurant.longitude },
                    'walking'
                  )}{' '}
                  min
                </div>
              </div>
              <p className="text-sm mt-1">
                {restaurant.isOpened ? (
                  <span className="text-green-600">Open</span>
                ) : (
                  <span className="text-red-600">Closed</span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {restaurant.openingHours}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
