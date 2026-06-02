import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/propiedades', label: 'Propiedades' },
    { href: '/mapa', label: 'Mapa' },
    { href: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
  ];

  const siteTitle = "ZAVIĀN";
  const siteSubtitle = "BY LOS NAVAS";

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl rounded-full bg-[#0B1C28]/60 border border-white/10 backdrop-blur-xl shadow-elegant px-8 py-3.5'
            : 'top-0 left-0 w-full px-6 py-6 md:px-12 bg-transparent'
        } flex justify-between items-center`}
      >
        <Link
          to="/"
          className="flex flex-col items-start z-50 group"
        >
          <span className="font-sans font-extrabold text-xl md:text-2xl tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-accent">
            {siteTitle}
          </span>
          <span className="font-sans font-light text-[9px] md:text-[10px] tracking-[0.3em] text-[#D1C7BD] -mt-0.5 transition-colors duration-300 group-hover:text-white">
            {siteSubtitle}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[11px] uppercase tracking-widest font-sans font-semibold transition-colors duration-300 ${
                location.pathname === link.href ? 'text-accent' : 'text-[#D1C7BD] hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden z-50 p-2 text-white hover:text-accent transition-colors duration-300"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile Drawer (Slide-out glass drawer) */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#07192A]/90 border-l border-white/10 backdrop-blur-2xl p-8 flex flex-col justify-between transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-lg tracking-[0.2em] text-white">
                  {siteTitle}
                </span>
                <span className="font-sans font-light text-[8px] tracking-[0.3em] text-[#D1C7BD] -mt-0.5">
                  {siteSubtitle}
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-accent transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest font-sans font-semibold py-2 border-b border-white/5 transition-colors ${
                    location.pathname === link.href ? 'text-accent' : 'text-[#D1C7BD] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground tracking-wider font-light">
            © {new Date().getFullYear()} ZAVIĀN.
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
