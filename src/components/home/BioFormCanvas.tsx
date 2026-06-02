import { useState, useEffect, useRef } from 'react';
import FormularioMultiStep from '@/components/home/FormularioMultiStep';
import { useSiteUser } from '@/hooks/useSiteUser';
import { Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

const BioFormCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useSiteUser();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "100%", label: "Asesoría Certificada" },
    { value: "50%+", label: "Ahorro en metros cuadrados" },
    { value: "100+", label: "Familias Reubicadas" }
  ];

  return (
    <section 
      ref={ref}
      id="contacto"
      className="relative py-24 px-6 md:px-12 lg:px-20 z-10 w-full overflow-hidden"
    >
      {/* Background glow glows */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-[#C09A6F]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#235E7A]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className={`max-w-6xl mx-auto z-10 relative transition-all duration-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Biography Panel (Left Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full lg:sticky lg:top-28">
            <div>
              <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-white tracking-[0.05em] leading-tight">
                ZAVIĀN
              </h2>
              <h3 className="font-sans font-light text-sm tracking-[0.3em] text-[#9BB0C1] uppercase mt-1">
                BY LOS NAVAS
              </h3>

              <div className="h-[2px] w-16 bg-[#C09A6F] my-6" />

              <p className="text-xs md:text-sm text-[#9BB0C1] font-light leading-relaxed mb-6">
                Creemos que tu espacio físico influye directamente en tu calidad de vida y crecimiento patrimonial. Nos especializamos en acompañar a familias e inversionistas de la CDMX a tomar la mejor decisión de reubicación y compra en Querétaro.
              </p>

              {/* Bullet points of trust */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C09A6F] shrink-0" />
                  <span className="text-xs text-white font-medium">Búsqueda directa off-market</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C09A6F] shrink-0" />
                  <span className="text-xs text-white font-medium">Análisis de plusvalía y viabilidad</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C09A6F] shrink-0" />
                  <span className="text-xs text-white font-medium">Acompañamiento legal de inicio a fin</span>
                </div>
              </div>

              {/* Dynamic Advisor details */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
                <p className="text-[10px] uppercase tracking-wider text-[#C09A6F] font-bold mb-3">Contacto Directo</p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-[#9BB0C1]">
                    <Mail className="w-3.5 h-3.5 text-[#C09A6F]" />
                    <span>{user?.email_usuario ?? 'contacto@zavianbylosnavas.com'}</span>
                  </div>
                  {user?.telefono_usuario && (
                    <div className="flex items-center gap-2.5 text-xs text-[#9BB0C1]">
                      <Phone className="w-3.5 h-3.5 text-[#C09A6F]" />
                      <span>{user.telefono_usuario}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 text-xs text-[#9BB0C1]">
                    <MapPin className="w-3.5 h-3.5 text-[#C09A6F]" />
                    <span>Querétaro, Qro. México</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-sans font-extrabold text-2xl text-white tracking-tight">{stat.value}</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#9BB0C1]/70 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Lead Form (Right Column) */}
          <div className="lg:col-span-7 bg-[#07192A]/50 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-elegant relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C09A6F] to-transparent" />
            <div className="mb-6">
              <h3 className="font-sans font-bold text-lg md:text-xl text-white">Encuentra tu propiedad ideal</h3>
              <p className="text-xs text-[#9BB0C1] font-light mt-1.5 leading-relaxed">
                Completa nuestro formulario interactivo de 4 pasos. Nuestro algoritmo y asesores buscarán el inmueble que mejor encaje con tu estilo de vida y presupuesto.
              </p>
            </div>

            {/* Embedded adjusted FormularioMultiStep */}
            <FormularioMultiStep />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BioFormCanvas;
