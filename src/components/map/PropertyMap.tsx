import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { X, Bed, Bath, Square } from 'lucide-react';

export interface MapProperty {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  priceValue: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: string;
  coordinates: { lat: number; lng: number };
}

interface PropertyMapProps {
  properties: MapProperty[];
  mapboxToken: string;
  centerLngLat?: { lat: number; lng: number } | null;
}

/**
 * Find the geographic centroid of the densest cluster of properties.
 * Uses a simple grid-based clustering (~5 km cells).
 */
function findDensestClusterCenter(properties: MapProperty[]): { lat: number; lng: number } | null {
  if (properties.length === 0) return null;

  const CELL_SIZE = 0.05; // ~5 km at equator
  const grid: Record<string, MapProperty[]> = {};

  for (const p of properties) {
    const key = `${Math.round(p.coordinates.lat / CELL_SIZE)}_${Math.round(p.coordinates.lng / CELL_SIZE)}`;
    if (!grid[key]) grid[key] = [];
    grid[key].push(p);
  }

  let maxCount = 0;
  let densestCell: MapProperty[] = [];

  for (const cell of Object.values(grid)) {
    if (cell.length > maxCount) {
      maxCount = cell.length;
      densestCell = cell;
    }
  }

  if (densestCell.length === 0) return null;

  const avgLat = densestCell.reduce((sum, p) => sum + p.coordinates.lat, 0) / densestCell.length;
  const avgLng = densestCell.reduce((sum, p) => sum + p.coordinates.lng, 0) / densestCell.length;

  return { lat: avgLat, lng: avgLng };
}

const PropertyMap = ({ properties, mapboxToken, centerLngLat }: PropertyMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const boundsFitRef = useRef(false);
  const [selected, setSelected] = useState<MapProperty | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !mapboxToken) return;

    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (e) {
        console.warn("Error removing map:", e);
      }
      mapRef.current = null;
    }
    boundsFitRef.current = false;

    try {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-99.1332, 19.4326],
        zoom: 11,
      });
      mapRef.current = map;
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
      setMapError(null);
    } catch (error: any) {
      console.error("Mapbox initialization error:", error);
      setMapError(error?.message || "Error al inicializar el mapa. Verifica tu configuración o si WebGL está activado.");
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapRef.current = null;
      }
    };
  }, [mapboxToken]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      properties.forEach((prop) => {
        const el = document.createElement('button');
        Object.assign(el.style, {
          background: 'transparent',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
        });

        const inner = document.createElement('span');
        inner.textContent = prop.price;
        Object.assign(inner.style, {
          display: 'block',
          background: '#1a1a1a',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '500',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          transition: 'transform 0.15s, background 0.15s',
          whiteSpace: 'nowrap',
          transformOrigin: 'center',
        });
        el.appendChild(inner);

        el.addEventListener('mouseenter', () => {
          inner.style.transform = 'scale(1.08)';
          inner.style.background = '#c09a6f';
        });
        el.addEventListener('mouseleave', () => {
          inner.style.transform = 'scale(1)';
          inner.style.background = '#1a1a1a';
        });
        el.addEventListener('click', () => setSelected(prop));

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([prop.coordinates.lng, prop.coordinates.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });

      if (properties.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        properties.forEach((p) =>
          bounds.extend([p.coordinates.lng, p.coordinates.lat])
        );
        boundsFitRef.current = true;
        map.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
      } else if (properties.length === 1) {
        boundsFitRef.current = true;
        map.flyTo({
          center: [properties[0].coordinates.lng, properties[0].coordinates.lat],
          zoom: 13,
        });
      } else if (!boundsFitRef.current) {
        // No properties with coordinates — fly to the densest cluster center
        // (this branch won't fire since properties is already filtered, but serves
        //  as a safe fallback; the real clustering happens below in the
        //  initial-load effect)
      }
    };

    if (map.loaded()) {
      renderMarkers();
    } else {
      map.once('load', renderMarkers);
    }
  }, [properties]);

  // Center on URL params coordinates when provided
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !centerLngLat) return;
    map.flyTo({
      center: [centerLngLat.lng, centerLngLat.lat],
      zoom: 13,
      duration: 1200,
    });
  }, [centerLngLat]);

  // On initial load, if no URL center was provided AND properties haven't
  // already set the bounds, fly to the zone with the highest concentration
  // of the owner's properties instead of the user's geolocation.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || centerLngLat || properties.length === 0) return;

    const flyToDensest = () => {
      if (boundsFitRef.current) return; // bounds were already set by marker rendering
      const center = findDensestClusterCenter(properties);
      if (center) {
        boundsFitRef.current = true;
        map.flyTo({
          center: [center.lng, center.lat],
          zoom: 12,
          duration: 1200,
        });
      }
    };

    if (map.loaded()) {
      // Small delay to let the marker useEffect run first
      setTimeout(flyToDensest, 100);
    } else {
      map.once('load', () => setTimeout(flyToDensest, 100));
    }
  }, [properties, centerLngLat]);

  return (
    <div className="relative w-full h-full">
      {mapError ? (
        <div className="absolute inset-0 bg-[#07192A] flex flex-col items-center justify-center p-6 text-center text-white border border-white/5 rounded-3xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
            <X className="w-6 h-6" />
          </div>
          <h3 className="font-sans font-bold text-base mb-2">Error de Inicialización del Mapa</h3>
          <p className="text-[#D1C7BD] text-xs max-w-sm mb-6 leading-relaxed font-semibold">
            {mapError.toLowerCase().includes("webgl")
              ? "Tu navegador o tarjeta gráfica no soportan WebGL, el cual es requerido por Mapbox para renderizar mapas interactivos 3D."
              : "No se pudo cargar el mapa. Verifica tu conexión a internet o la clave pública de Mapbox."}
          </p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-extrabold">
            Puedes consultar el catálogo en la lista lateral
          </p>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-full" />
      )}

      {selected && !mapError && (
        <div className="absolute bottom-6 left-4 w-72 z-20 animate-fade-in">
          <div className="bg-card rounded-xl shadow-elegant overflow-hidden">
            <div className="relative">
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-36 object-cover"
                />
              ) : (
                <div className="w-full h-36 bg-muted" />
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 p-1.5 bg-foreground/80 rounded-full text-background hover:bg-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white font-medium text-sm">{selected.price}</span>
              </div>
            </div>
            <div className="p-3">
              <p className="font-serif text-base mb-0.5 line-clamp-1">{selected.title}</p>
              <p className="text-xs text-muted-foreground mb-2">{selected.area}</p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="w-3 h-3" /> {selected.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3 h-3" /> {selected.bathrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Square className="w-3 h-3" /> {selected.sqm}m²
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!mapboxToken && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
          <p className="text-sm text-muted-foreground">Configurando mapa…</p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
