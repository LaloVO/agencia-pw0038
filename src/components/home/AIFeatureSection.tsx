import { useEffect, useRef, useState } from 'react';

const AIFeatureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-foreground text-background relative overflow-hidden"
    >
      <div className="luxury-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Image with AI overlay */}
        <div
          className={`order-2 lg:order-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="aspect-[3/4] overflow-hidden relative rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2670&auto=format&fit=crop"
              alt="Interior Details"
              className="w-full h-full object-cover opacity-80"
            />
            {/* AI Analysis Overlay */}
            <div className="absolute bottom-8 left-8 bg-luxury-white/10 backdrop-blur-md p-4 border border-luxury-white/10 max-w-xs rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-white">
                  AI Analysis Complete
                </span>
              </div>
              <p className="text-xs font-light leading-relaxed text-luxury-white/80">
                Valoración de mercado: +12% vs 2024.
                <br />
                Iluminación natural optimizada.
                <br />
                Potencial de renta alta.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <h2
            className={`font-serif text-4xl md:text-6xl mb-8 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Datos invisibles,
            <br />
            <span className="italic text-muted-foreground">resultados tangibles.</span>
          </h2>
          <p
            className={`font-sans text-lg font-light text-muted-foreground mb-12 leading-relaxed max-w-md transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            No solo vendemos metros cuadrados. Utilizamos Deep Learning para entender
            el estilo de vida, la plusvalía futura y la conexión emocional de cada
            espacio.
          </p>
          <div
            className={`grid grid-cols-2 gap-8 border-t border-luxury-white/10 pt-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div>
              <span className="block text-3xl font-serif mb-1 text-primary">98%</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Precisión en Valuaciones
              </span>
            </div>
            <div>
              <span className="block text-3xl font-serif mb-1 text-primary">15 Días</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Promedio de Venta
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatureSection;
