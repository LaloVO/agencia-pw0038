import { Search, MapPin, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const HeroCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);
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
        console.error('Error geocoding in HeroCanvas:', error);
      }
    }
    
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <header className="relative w-full h-[95vh] min-h-[650px] overflow-hidden flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-20 z-10">
      
      {/* Background Graphic elements on the Single Surface */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#C09A6F]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-[#235E7A]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Background Architectural Artwork fading horizontally */}
      <div className="absolute inset-0 z-0 flex justify-end pointer-events-none select-none">
        <div className="w-full md:w-[55%] h-full relative">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
            alt="Agencia Modern Architecture"
            className="w-full h-full object-cover object-center opacity-40 md:opacity-35"
          />
          {/* Fades to blend into single surface background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05121E] via-[#05121E]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05121E] via-transparent to-[#05121E]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05121E]/20 to-[#05121E]" />
        </div>
      </div>

      {/* Top Tagline */}
      <div className="relative z-10 w-full flex justify-between items-start">
        <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <p className="text-xs text-[#9BB0C1] max-w-[280px] font-light leading-relaxed">
            Propiedades exclusivas con diseño de autor y visión de futuro en Querétaro.
          </p>
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="relative z-10 w-full max-w-4xl my-auto flex flex-col items-start">
        <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-[85px] text-white tracking-[0.1em] leading-none mb-1">
          <span className={`block transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Agencia
          </span>
        </h1>
        <div className={`flex items-center gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="h-[2px] w-12 bg-[#C09A6F]" />
          <h2 className="font-sans font-light text-base md:text-xl tracking-[0.4em] text-[#D1C7BD] uppercase">
            BY Agencia
          </h2>
        </div>

        <p className={`mt-6 text-sm md:text-base text-[#9BB0C1] max-w-lg font-light leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          ¿Sigues pagando rentas altísimas en CDMX por espacios cada vez más reducidos? Es momento de dar el salto. En Querétaro estás comprando exactamente a la mitad, con plusvalía, jardín y calidad de vida.
        </p>

        {/* Custom Glass search bar */}
        <div 
          className={`w-full max-w-2xl mt-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Toggle (Comprar / Rentar) */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setAction('1')}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-sans transition-all duration-300 border ${
                action === '1'
                  ? 'bg-[#C09A6F] text-[#05121E] font-bold border-[#C09A6F]'
                  : 'bg-white/5 text-[#D1C7BD] border-white/10 hover:bg-white/10'
              }`}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => setAction('2')}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-sans transition-all duration-300 border ${
                action === '2'
                  ? 'bg-[#C09A6F] text-[#05121E] font-bold border-[#C09A6F]'
                  : 'bg-white/5 text-[#D1C7BD] border-white/10 hover:bg-white/10'
              }`}
            >
              Rentar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row gap-2 p-2 rounded-3xl bg-[#07192A]/50 border border-white/10 backdrop-blur-xl shadow-elegant">
            <div className="flex-1 flex items-center bg-white/5 hover:bg-white/10 rounded-2xl px-5 py-3 transition-colors duration-300">
              <Search className="w-4 h-4 text-[#9BB0C1] mr-3 shrink-0" />
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
                placeholder="Ingresa colonia, zona o ciudad en Querétaro..."
                className="bg-transparent w-full outline-none text-white placeholder-[#9BB0C1]/60 font-sans text-xs md:text-sm"
              />
            </div>
            
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-[#C09A6F] text-[#05121E] font-sans uppercase text-[10px] tracking-widest font-bold hover:bg-[#A07B53] transition-colors duration-300 shrink-0"
            >
              Buscar Propiedades
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#07192A] border border-white/10 shadow-2xl rounded-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-5 py-3 text-left flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C09A6F] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans font-medium text-white text-xs">
                        {suggestion.text}
                      </p>
                      <p className="font-sans text-[#9BB0C1] text-[10px] mt-0.5 truncate">
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

      {/* Bottom element: Scroll down anchor */}
      <div className={`relative z-10 w-full flex justify-between items-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#9BB0C1]/50 font-light">
          Calidad de vida · Diseño · Visión
        </span>
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
          className="flex items-center gap-2 group hover:text-white text-[#9BB0C1] transition-colors"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] font-light">Ver Más</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>

    </header>
  );
};

export default HeroCanvas;
