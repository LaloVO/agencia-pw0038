import { useEffect, useRef, useState } from 'react';

const PhilosophySection = () => {
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="luxury-container grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4">
          <span
            className={`text-primary text-xs uppercase tracking-[0.2em] font-bold block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Filosofía Agencia
          </span>
          <div
            className={`h-[1px] bg-border transition-all duration-1000 delay-300 ${
              isVisible ? 'w-full' : 'w-0'
            }`}
          />
        </div>

        <div className="md:col-span-8">
          <p
            className={`font-serif text-3xl md:text-5xl leading-tight text-foreground font-light transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Redefinimos la experiencia inmobiliaria fusionando la{' '}
            <span className="italic text-primary">intuición humana</span> con la
            precisión de la inteligencia artificial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h3 className="font-sans font-medium text-sm uppercase tracking-widest mb-4">
                Para Compradores
              </h3>
              <p className="font-sans text-muted-foreground font-light leading-relaxed">
                Algoritmos predictivos que encuentran propiedades fuera del mercado
                antes de que se listen. Accede a lo exclusivo.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h3 className="font-sans font-medium text-sm uppercase tracking-widest mb-4">
                Para Vendedores
              </h3>
              <p className="font-sans text-muted-foreground font-light leading-relaxed">
                Valoración dinámica basada en Big Data y staging virtual instantáneo
                para maximizar el valor de tu patrimonio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
