import { Search, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [query, setQuery] = useState('');
  const [action, setAction] = useState('1'); // '1' = Venta, '2' = Renta
  const navigate = useNavigate();
  const { site } = useSiteUser();

  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    ('pk.eyJ1IjoiaG9tZXB0eW14Ii' + 'wiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ.' + 'ZKWLoVLu-fVaTXRD7HfXTg')
  ).trim();

  // Suggestions and Autocomplete State
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to clicks outside to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce as the user types
  useEffect(() => {
    if (!query.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    // If the query matches the selected coordinates' name, don't query again
    if (selectedCoords && query === selectedCoords.name) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx&proximity=-99.1332,19.4326`
        );
        if (response.ok) {
          const data = await response.json();
          let features = data.features || [];
          setSuggestions(features);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feature: any) => {
    const [lng, lat] = feature.center;
    const name = feature.place_name;
    setQuery(name);
    setSelectedCoords({ lat, lng, name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('accion', action);
    
    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (query.trim() && mapboxToken) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=1&country=mx`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (error) {
        console.error('Error geocoding in HeroSection:', error);
      }
    }
    
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <header className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop')`,
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full luxury-container">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-white leading-[1.1] mb-8 md:mb-12 drop-shadow-lg">
          <span
            className={`block transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            Inteligencia
          </span>
          <span
            className={`block italic font-light ml-0 md:ml-20 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            que habita.
          </span>
        </h1>

        {/* Search Bar Container */}
        <div
          className={`transition-all duration-1000 delay-500 max-w-3xl relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Toggle (Comprar / Rentar) */}
          <div className="flex gap-2 mb-3.5">
            <button
              type="button"
              onClick={() => setAction('1')}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-sans transition-all duration-300 border backdrop-blur-sm ${
                action === '1'
                  ? 'bg-luxury-white text-luxury-black font-semibold border-luxury-white shadow-md'
                  : 'bg-luxury-white/5 text-luxury-white/80 border-luxury-white/10 hover:bg-luxury-white/15'
              }`}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => setAction('2')}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-sans transition-all duration-300 border backdrop-blur-sm ${
                action === '2'
                  ? 'bg-luxury-white text-luxury-black font-semibold border-luxury-white shadow-md'
                  : 'bg-luxury-white/5 text-luxury-white/80 border-luxury-white/10 hover:bg-luxury-white/15'
              }`}
            >
              Rentar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex flex-col md:flex-row gap-2.5 p-2 md:p-3 rounded-2xl md:rounded-full bg-luxury-white/10 backdrop-blur-md border border-luxury-white/20">
            <div className="flex-1 flex items-center bg-luxury-white rounded-full px-6 py-4 md:py-3.5 shadow-inner">
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (selectedCoords && e.target.value !== selectedCoords.name) {
                    setSelectedCoords(null);
                  }
                }}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="Ingresa colonia, ciudad, zona o código postal"
                className="bg-transparent w-full outline-none text-foreground placeholder-muted-foreground font-sans text-sm md:text-base"
              />
            </div>
            
            <button
              type="submit"
              className="px-10 py-4 md:py-3 rounded-full bg-foreground text-background font-sans uppercase text-xs tracking-widest font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg active:scale-95 shrink-0"
            >
              Buscar
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden z-50 transition-all duration-200 max-h-72 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-6 py-3.5 text-left flex items-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border-b border-slate-100 dark:border-slate-800/40 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans font-medium text-slate-800 dark:text-slate-200 text-sm">
                        {suggestion.text}
                      </p>
                      <p className="font-sans text-slate-400 dark:text-slate-500 text-xs mt-0.5 truncate">
                        {suggestion.place_name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
