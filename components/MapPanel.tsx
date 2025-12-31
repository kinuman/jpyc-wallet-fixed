import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useAppStore } from '../lib/store';

export default function MapPanel() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const { tasks, currentLocation, setCurrentLocation } = useAppStore();
  const markers = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (map.current) return; // Initialize only once

    const defaultLat = 35.6595;
    const defaultLng = 139.7004;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: 'https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json',
      center: [defaultLng, defaultLat],
      zoom: 13,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }));

    // Get initial location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentLocation(latitude, longitude);
        map.current?.setCenter([longitude, latitude]);
      });
    }
  }, [setCurrentLocation]);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(m => m.remove());
    markers.current = [];

    // Add task markers
    tasks.forEach(task => {
      const el = document.createElement('div');
      el.className = 'task-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundColor = '#4CAF50';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.innerHTML = '🌲';

      const marker = new maplibregl.Marker(el)
        .setLngLat([task.location.lng, task.location.lat])
        .setPopup(new maplibregl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${task.title}</h3>
            <p class="text-sm">${task.reward} JPYC</p>
          </div>
        `))
        .addTo(map.current!);
      
      markers.current.push(marker);
    });
  }, [tasks]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
