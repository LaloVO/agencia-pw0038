import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whatsappMsg = property
    ? encodeURIComponent(`Hola, me interesa la propiedad: ${property.nombre}`)
    : '';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <div className="bg-[#05121E] text-white min-h-screen relative font-sans">
        <Navbar />
        <main className="pt-28 px-6 md:px-12 max-w-6xl mx-auto animate-pulse">
          <div className="h-8 bg-white/5 rounded-lg w-1/3 mb-8" />
          <div className="aspect-video bg-white/5 rounded-2xl mb-8" />
          <div className="h-10 bg-white/5 rounded-lg w-1/2 mb-4" />
          <div className="h-4 bg-white/5 rounded-lg w-1/3" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="bg-[#05121E] text-white min-h-screen relative font-sans">
        <Navbar />
        <main className="pt-28 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <p className="font-sans font-bold text-2xl text-[#9BB0C1] mb-4">Propiedad no encontrada</p>
            <Link to="/mapa" className="text-xs uppercase tracking-widest text-[#C09A6F] hover:text-white transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(', ');

  return (
    <div className="bg-[#05121E] text-white min-h-screen relative font-sans selection:bg-[#C09A6F] selection:text-[#05121E]">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] bg-[#235E7A]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#C09A6F]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      <main className="pt-24 min-h-screen relative z-10">
        {/* Back */}
        <div className="px-6 md:px-12 py-6 max-w-6xl mx-auto">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9BB0C1] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al inventario
          </Link>
        </div>

        {/* Images Collage */}
        <div className="px-6 md:px-12 max-w-6xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-elegant border border-white/5">
            <div className="aspect-[4/3] md:aspect-auto md:col-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 hover:scale-102" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {images.slice(1, 3).map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl md:rounded-none">
                  <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 max-w-6xl mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Details (Left Columns) */}
            <div className="lg:col-span-2">
              <h1 className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-wide mb-4 leading-tight">
                {property.nombre}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-[#C09A6F] text-[#05121E] text-[10px] font-sans font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {badge}
                </span>
                {property.tipo && (
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-white text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full capitalize">
                    {property.tipo}
                  </span>
                )}
                {location && (
                  <span className="flex items-center gap-1.5 text-[#9BB0C1] font-sans text-xs md:text-sm ml-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C09A6F] shrink-0" />
                    {location}
                  </span>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {property.habitaciones != null && (
                  <div className="bg-[#07192A]/40 border border-white/5 rounded-2xl p-5 text-center shadow-elegant">
                    <Bed className="w-5 h-5 mx-auto mb-2 text-[#C09A6F]" />
                    <p className="font-sans font-extrabold text-2xl text-white">{property.habitaciones}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#9BB0C1] font-semibold mt-1">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="bg-[#07192A]/40 border border-white/5 rounded-2xl p-5 text-center shadow-elegant">
                    <Bath className="w-5 h-5 mx-auto mb-2 text-[#C09A6F]" />
                    <p className="font-sans font-extrabold text-2xl text-white">{property.banios}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#9BB0C1] font-semibold mt-1">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="bg-[#07192A]/40 border border-white/5 rounded-2xl p-5 text-center shadow-elegant">
                    <Square className="w-5 h-5 mx-auto mb-2 text-[#C09A6F]" />
                    <p className="font-sans font-extrabold text-2xl text-white">{property.area}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#9BB0C1] font-semibold mt-1">Metros m²</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="bg-[#07192A]/40 border border-white/5 rounded-2xl p-5 text-center shadow-elegant">
                    <Car className="w-5 h-5 mx-auto mb-2 text-[#C09A6F]" />
                    <p className="font-sans font-extrabold text-2xl text-white">{property.estacionamientos}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#9BB0C1] font-semibold mt-1">Cochera</p>
                  </div>
                )}
              </div>

              {property.descripcion && (
                <div className="border-t border-white/5 pt-8">
                  <h2 className="font-sans font-bold text-lg text-white mb-4">Descripción</h2>
                  <p className="font-sans text-xs md:text-sm text-[#9BB0C1] leading-relaxed whitespace-pre-line font-light">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar CTA Card (Right Column) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-[#07192A]/50 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-elegant relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C09A6F] to-transparent" />
                
                <p className="font-sans font-extrabold text-3xl text-white tracking-tight">{formatPrice(property.precio)}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#9BB0C1] font-bold mt-1 mb-6">
                  {badge === 'Renta' ? 'Renta Mensual' : 'Precio de Venta'}
                </p>

                {user && (
                  <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-white/5">
                    {user.imagen_perfil_usuario ? (
                      <img
                        src={user.imagen_perfil_usuario}
                        alt={user.nombre_usuario}
                        className="w-11 h-11 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center font-sans font-bold text-sm text-[#C09A6F]">
                        {user.nombre_usuario[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-sans font-bold text-xs text-white">{user.nombre_usuario}</p>
                      <p className="font-sans text-[10px] text-[#9BB0C1] uppercase tracking-wider font-light mt-0.5">Asesor Verificado</p>
                    </div>
                  </div>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-sans font-bold text-xs uppercase tracking-widest transition-colors shadow-elegant"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  Contactar Asesor
                </a>

                <div className="my-6 border-t border-white/5" />

                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-sm text-white">¿No es lo que buscas?</h4>
                  <p className="font-sans text-[11px] text-[#9BB0C1] leading-relaxed font-light">
                    Si esta propiedad no cumple tus expectativas, completa nuestra solicitud inteligente. Buscaremos el espacio ideal según tu presupuesto y rutina.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-[#C09A6F] text-[#C09A6F] hover:bg-[#C09A6F] hover:text-[#05121E] rounded-full font-sans font-bold text-[10px] uppercase tracking-widest transition-colors duration-300"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C09A6F]" />
                    Búsqueda Inteligente
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
