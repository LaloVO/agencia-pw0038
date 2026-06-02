import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCanvas from '@/components/home/HeroCanvas';
import ConceptSection from '@/components/home/ConceptSection';
import ServicesSection from '@/components/home/ServicesSection';
import PropertiesCanvas from '@/components/home/PropertiesCanvas';
import BioFormCanvas from '@/components/home/BioFormCanvas';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ZAVIĀN | By Los Navas — Bienes Raíces Querétaro</title>
        <meta
          name="description"
          content="En ZAVIĀN te ayudamos a encontrar propiedades exclusivas que combinan calidad de vida, diseño y visión de futuro en Querétaro. Encuentra tu espacio ideal con Los Navas."
        />
      </Helmet>

      <div className="bg-[#05121E] text-white min-h-screen relative overflow-hidden font-sans selection:bg-[#C09A6F] selection:text-[#05121E]">
        {/* Glow dots scattered across the unified surface */}
        <div className="absolute top-[15%] left-[-10%] w-[50%] h-[40%] bg-[#235E7A]/10 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute top-[40%] right-[-10%] w-[60%] h-[50%] bg-[#C09A6F]/5 rounded-full blur-[180px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[45%] bg-[#235E7A]/8 rounded-full blur-[160px] pointer-events-none z-0" />

        <Navbar />

        <main className="relative z-10">
          <HeroCanvas />
          <ConceptSection />
          <ServicesSection />
          <PropertiesCanvas />
          <BioFormCanvas />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
