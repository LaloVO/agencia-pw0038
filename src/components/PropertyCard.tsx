import { Link } from 'react-router-dom';
import { Bed, Bath, Square } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(' • ') || '';

  if (variant === 'compact') {
    return (
      <Link to={`/properties/${property.id}`} className="group block bg-[#07192A]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-elegant hover:border-[#C09A6F]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05121E]/80 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#C09A6F] text-[#05121E] text-[10px] font-sans font-bold uppercase tracking-wider rounded-full">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white font-sans font-bold text-lg">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-sans font-bold text-base text-white group-hover:text-[#C09A6F] transition-colors mb-1.5 truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs text-[#9BB0C1] mb-4 truncate">{location}</p>
          <div className="flex gap-4 text-xs text-[#9BB0C1]/80">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                <Bed className="w-3.5 h-3.5 text-[#C09A6F]" />
                {property.habitaciones}
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                <Bath className="w-3.5 h-3.5 text-[#C09A6F]" />
                {property.banios}
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                <Square className="w-3.5 h-3.5 text-[#C09A6F]" />
                {property.area}m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/properties/${property.id}`} className="min-w-[85vw] md:min-w-[38vw] group cursor-pointer snap-center block bg-[#07192A]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden p-3 shadow-elegant hover:border-[#C09A6F]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05121E]/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1 bg-[#C09A6F] text-[#05121E] text-[10px] font-sans font-bold uppercase tracking-wider rounded-full shadow-md">
            {badge}
          </span>
        </div>
      </div>
      <div className="p-4 flex justify-between items-start gap-4">
        <div className="flex-1 overflow-hidden">
          <h3 className="font-sans font-bold text-lg md:text-xl text-white mb-1.5 group-hover:text-[#C09A6F] transition-colors truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#9BB0C1] truncate">
            {location}
          </p>
          <div className="flex gap-4 text-xs text-[#9BB0C1]/80 mt-3">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                <Bed className="w-3.5 h-3.5 text-[#C09A6F]" />
                {property.habitaciones} Hab
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                <Bath className="w-3.5 h-3.5 text-[#C09A6F]" />
                {property.banios} Bañ
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                <Square className="w-3.5 h-3.5 text-[#C09A6F]" />
                {property.area} m²
              </span>
            )}
          </div>
        </div>
        <span className="font-sans font-bold text-base md:text-lg text-[#C09A6F] whitespace-nowrap pt-1">
          {formatPrice(property.precio)}
        </span>
      </div>
    </Link>
  );
};

export default PropertyCard;
