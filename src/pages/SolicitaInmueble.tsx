import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user } = useSiteUser();

  return (
    <div className="bg-[#05121E] text-white min-h-screen relative font-sans selection:bg-[#C09A6F] selection:text-[#05121E]">
      <Helmet>
        <title>Agencia | Búsqueda Inteligente — Querétaro</title>
        <meta
          name="description"
          content="Completa nuestra solicitud inteligente de búsqueda inmobiliaria. Evaluamos tu estilo de vida y presupuesto para encontrar tu propiedad ideal en Querétaro."
        />
      </Helmet>

      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] bg-[#235E7A]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#C09A6F]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      <main className="pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header de la Sección */}
          <div className="text-center mb-12">
            <h1 className="font-sans text-3xl md:text-5xl text-white font-extrabold tracking-wide">
              Búsqueda Inteligente
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#9BB0C1] max-w-2xl mx-auto leading-relaxed mt-4 font-light">
              Define tu presupuesto, expediente y cuéntanos sobre tu rutina diaria. Nuestro motor buscará y filtrará las mejores residencias exclusivas para ti en Querétaro.
            </p>
          </div>

          {/* Formulario MultiStep wrapped in premium glassmorphic card */}
          <div className="bg-[#07192A]/50 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-elegant relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C09A6F] to-transparent" />
            <FormularioMultiStep />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
