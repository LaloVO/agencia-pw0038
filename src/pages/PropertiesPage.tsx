import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Sparkles, Building, Loader2 } from 'lucide-react';

export default function PropertiesPage() {
  const { properties, isLoading } = useProperties();

  return (
    <div className="bg-[#05121E] text-white min-h-screen relative font-sans selection:bg-[#C09A6F] selection:text-[#05121E]">
      <Helmet>
        <title>ZAVIĀN | Portafolio de Propiedades — Querétaro</title>
        <meta
          name="description"
          content="Explora nuestra colección de propiedades y residencias exclusivas en Querétaro con ZAVIĀN."
        />
      </Helmet>

      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] bg-[#235E7A]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#C09A6F]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      <main className="pt-28 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-16 border-b border-white/5 pb-10">
            <h1 className="font-sans text-3xl md:text-5xl text-white font-extrabold tracking-wide mb-4">
              Propiedades Exclusivas
            </h1>
            <p className="text-[#9BB0C1] text-xs sm:text-sm max-w-xl leading-relaxed font-light">
              Una cuidada selección de inmuebles de autor con la mejor relación costo-beneficio y alta plusvalía en Querétaro.
            </p>
          </div>

          {/* Catalog content */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 text-[#9BB0C1]">
              <Loader2 className="w-8 h-8 text-[#C09A6F] animate-spin" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Cargando portafolio...</span>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 bg-[#07192A]/40 border border-white/5 rounded-3xl p-10 max-w-xl mx-auto">
              <Building className="w-10 h-10 text-[#C09A6F] mx-auto mb-4" />
              <h3 className="font-sans font-bold text-lg text-white mb-2">No se encontraron propiedades</h3>
              <p className="text-[#9BB0C1] text-xs leading-relaxed font-light">
                Actualmente no tenemos propiedades visibles en el portal. Por favor contáctanos directamente para consultar opciones exclusivas off-market.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div key={property.id} className="w-full">
                  <PropertyCard property={property} variant="compact" />
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
