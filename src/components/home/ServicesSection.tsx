import { useState, useEffect, useRef } from 'react';
import { Home, ShieldCheck, UserCheck, Star } from 'lucide-react';

const ServicesSection = () => {
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

  const services = [
    {
      icon: UserCheck,
      title: "Búsqueda Inmobiliaria Personalizada",
      desc: "Analizamos tu perfil, necesidades de espacio y estilo de vida para buscar, filtrar y encontrar las mejores opciones disponibles en el mercado de Querétaro sin que pierdas tiempo."
    },
    {
      icon: ShieldCheck,
      title: "Consultoría y Asesoría Legal",
      desc: "Te acompañamos en todo el proceso de reubicación y compra. Desde la revisión de la documentación legal del inmueble hasta la firma notarial, garantizando una inversión 100% segura."
    },
    {
      icon: Home,
      title: "Arquitectura y Diseño de Autor",
      desc: "Agencia es sinónimo de diseño y visión de futuro. Te asesoramos en la selección de propiedades con propuestas arquitectónicas modernas, materiales de alta calidad y distribuciones eficientes."
    }
  ];

  return (
    <section 
      ref={ref}
      id="servicios"
      className="relative py-24 px-6 md:px-12 lg:px-20 z-10 w-full overflow-hidden"
    >
      {/* Light highlights */}
      <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-[#235E7A]/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className={`max-w-6xl mx-auto z-10 relative transition-all duration-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-white tracking-[0.05em] leading-tight">
            ¿Cómo te ayudamos?
          </h2>
          <p className="text-xs md:text-sm text-[#9BB0C1] font-light mt-4 leading-relaxed">
            Te ofrecemos un acompañamiento integral llave en mano para hacer de tu transición de CDMX a Querétaro una experiencia fluida, agradable y financieramente exitosa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div 
                key={i} 
                className="group relative rounded-3xl p-8 bg-[#07192A]/40 border border-white/5 hover:border-white/15 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] shadow-elegant overflow-hidden"
              >
                {/* Decorative border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C09A6F]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C09A6F] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="font-sans font-bold text-base md:text-lg text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-xs md:text-sm text-[#9BB0C1] font-light leading-relaxed">
                  {service.desc}
                </p>

                {/* Subtle leaf icon decorative highlight */}
                <div className="absolute bottom-[-15px] right-[-15px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
                  <Star className="w-24 h-24 text-white" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
