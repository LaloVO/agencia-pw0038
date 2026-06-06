import { useState, useEffect, useRef } from 'react';
import { Sparkles, TrendingUp, Compass, Landmark } from 'lucide-react';

const ConceptSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const comparatives = [
    {
      icon: Landmark,
      title: "El Error Financiero de la CDMX",
      description: "Seguir pagando rentas altísimas por departamentos de 70 metros cuadrados en colonias como la Narvarte, Roma o Condesa limita tu crecimiento patrimonial.",
      metric: "$6.5M",
      metricLabel: "Costo promedio departamento chico"
    },
    {
      icon: TrendingUp,
      title: "El Apalancamiento en Querétaro",
      description: "En Querétaro estás comprando propiedades de alto valor al 50% de costo por metro cuadrado comparado con la capital, capitalizando la plusvalía desde el primer día.",
      metric: "50%",
      metricLabel: "Menor costo por metro cuadrado"
    },
    {
      icon: Compass,
      title: "Espacio y Vida Real",
      description: "Cambiar de ciudad no es solo reubicarse; es ganar amplitud, jardín privado, seguridad para tu familia y amenidades pensadas para el estilo de vida actual.",
      metric: "3 Niveles",
      metricLabel: "Residencias con jardín propio"
    }
  ];

  return (
    <section 
      ref={ref}
      id="concepto"
      className="relative py-24 px-6 md:px-12 lg:px-20 z-10 w-full overflow-hidden"
    >
      {/* Glow highlight behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#C09A6F]/2 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className={`max-w-6xl mx-auto z-10 relative transition-all duration-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-white tracking-[0.05em] leading-tight">
            ¿Por qué Agencia?
          </h2>
          <p className="text-sm md:text-base text-[#9BB0C1] font-light mt-4 leading-relaxed">
            No somos una inmobiliaria tradicional. Ayudamos a familias e inversionistas a reubicar su capital de manera inteligente de la CDMX a Querétaro, logrando un balance perfecto entre salud financiera y calidad de vida.
          </p>
        </div>

        {/* Bento/Asymmetric layout comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-3xl p-8 bg-white/5 border border-white/10 hover:border-[#C09A6F]/30 backdrop-blur-md shadow-elegant transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C09A6F]/10 flex items-center justify-center text-[#C09A6F] mb-6 group-hover:bg-[#C09A6F]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#9BB0C1] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-start">
                  <span className="font-sans font-extrabold text-3xl md:text-4xl text-[#C09A6F] tracking-tight">
                    {item.metric}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#9BB0C1]/60 font-medium mt-1">
                    {item.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ConceptSection;
