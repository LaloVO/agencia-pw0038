import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SkeletonCard = () => (
  <div className="min-w-[85vw] md:min-w-[38vw] animate-pulse bg-[#07192A]/40 border border-white/5 rounded-3xl p-3">
    <div className="aspect-[4/3] mb-6 rounded-2xl bg-white/5" />
    <div className="p-4">
      <div className="h-6 bg-white/5 rounded-lg w-3/4 mb-3" />
      <div className="h-4 bg-white/5 rounded-lg w-1/2 mb-4" />
      <div className="flex gap-4">
        <div className="h-8 bg-white/5 rounded-lg w-16" />
        <div className="h-8 bg-white/5 rounded-lg w-16" />
      </div>
    </div>
  </div>
);

const PropertiesCanvas = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { properties, isLoading } = useProperties({ limit: 6 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="propiedades" className="relative py-24 z-10 w-full overflow-hidden">
      {/* Light highlights */}
      <div className="absolute top-1/2 left-0 w-[40%] h-[60%] bg-[#235E7A]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="px-6 md:px-12 lg:px-20 mb-12 flex justify-between items-end max-w-6xl mx-auto z-10 relative">
        <div>
          <h2
            className={`font-sans font-extrabold text-3xl md:text-5xl text-white tracking-[0.05em] leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Propiedades Disponibles
          </h2>
        </div>
        <Link
          to="/mapa"
          className={`hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-[#C09A6F] hover:text-white transition-colors duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Ver Catálogo Completo
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-20 pb-10 snap-x hide-scrollbar max-w-7xl mx-auto z-10 relative">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.map((property, index) => (
              <div
                key={property.id}
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
      </div>

      <div className="px-6 md:hidden mt-4 text-center z-10 relative">
        <Link
          to="/mapa"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C09A6F] border-b border-[#C09A6F] pb-1 hover:text-white hover:border-white transition-colors"
        >
          Ver Catálogo Completo
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default PropertiesCanvas;
