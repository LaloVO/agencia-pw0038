import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Heart, Shield } from "lucide-react";

export default function SmartSearchCTA() {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 z-10 w-full overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#235E7A]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-sans text-3xl md:text-5xl text-white font-extrabold tracking-wide leading-tight">
              Encuentra la residencia ideal según tu estilo de vida
            </h2>
            
            <p className="font-sans text-sm md:text-base text-[#9BB0C1] leading-relaxed font-light">
              Dejar de buscar propiedades en listas rígidas. A través de nuestro embudo calificado de 6 pasos, define tus necesidades reales, tu presupuesto viable, tus métodos de financiamiento y documentación. 
            </p>
            
            <p className="font-sans text-xs md:text-sm text-[#9BB0C1]/80 leading-relaxed font-light">
              Nuestro motor avanzado analiza tu rutina diaria para conectar tu perfil con residencias que realmente potencien tu bienestar.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <Heart className="w-5 h-5 text-[#C09A6F] shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">Búsqueda por Rutina</h4>
                  <p className="text-[10px] text-[#9BB0C1] mt-0.5 font-light">Analizamos tus necesidades familiares e internet.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Shield className="w-5 h-5 text-[#C09A6F] shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">Expediente Seguro</h4>
                  <p className="text-[10px] text-[#9BB0C1] mt-0.5 font-light">Tus documentos protegidos por cifrado central.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/solicita-inmueble"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C09A6F] hover:bg-[#A07B53] text-[#05121E] font-bold rounded-full font-sans text-sm transition-all duration-300 shadow-elegant hover:scale-105"
              >
                Comenzar Búsqueda Inteligente
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Main Image */}
            <div className="aspect-[4/3] w-full max-w-lg rounded-3xl overflow-hidden shadow-elegant border border-white/10 relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Estate Lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05121E]/60 via-transparent to-transparent" />
            </div>

            {/* Floating Glassmorphic Card (Mockup) */}
            <div className="absolute -bottom-6 left-6 md:-left-6 max-w-xs bg-[#07192A]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-elegant animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#C09A6F] flex items-center justify-center font-sans text-xs text-[#05121E] font-bold">
                  IA
                </div>
                <div>
                  <h5 className="font-sans font-bold text-xs text-white">Perfil de Estilo de Vida</h5>
                  <span className="text-[9px] text-[#9BB0C1]/60 block font-light">Evaluando requerimientos...</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#9BB0C1] italic leading-relaxed bg-[#05121E]/40 p-2.5 rounded-xl border border-white/5 font-light">
                &ldquo;Familia con 2 hijos pequeños y mascota. Requiere oficina para home office con internet de alta velocidad, jardín privado amplio, y escuelas bilingües a menos de 15 minutos de distancia.&rdquo;
              </p>

              <div className="flex items-center justify-between mt-3 text-[10px] font-sans font-bold text-green-400">
                <span>✓ Presupuesto: Apto</span>
                <span>Match: 96%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
