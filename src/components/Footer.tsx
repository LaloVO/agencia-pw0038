import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050D14] pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <Link to="/" className="flex flex-col items-start group">
              <span className="font-sans font-extrabold text-2xl tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-accent">
                Agencia
              </span>
              <span className="font-sans font-light text-[10px] tracking-[0.3em] text-[#D1C7BD] -mt-0.5 transition-colors duration-300 group-hover:text-white">
                BY Agencia
              </span>
            </Link>
            <p className="font-sans text-xs text-[#9BB0C1] max-w-xs mt-4 leading-relaxed font-light">
              Propiedades exclusivas con diseño de autor y visión de futuro en Querétaro, México.
            </p>
          </div>

          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-sans font-semibold">
            <a 
              href="https://www.instagram.com/Agenciabylosnavas/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9BB0C1] hover:text-[#C09A6F] transition-colors"
            >
              Instagram
            </a>
            <a 
              href="#contacto" 
              className="text-[#9BB0C1] hover:text-[#C09A6F] transition-colors"
            >
              Búsqueda Inteligente
            </a>
            <a 
              href="#concepto" 
              className="text-[#9BB0C1] hover:text-[#C09A6F] transition-colors"
            >
              ¿Por qué Agencia?
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-[9px] text-[#9BB0C1]/50 uppercase tracking-widest flex flex-col sm:flex-row justify-between gap-4 font-light">
          <span>© {new Date().getFullYear()} Agencia. Todos los derechos reservados.</span>
          <span>Desarrollado para Agencia Satélite CBF</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
