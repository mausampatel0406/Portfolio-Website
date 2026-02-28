import { useEffect, useState } from 'react';
import { Download, MapPin, Phone, Mail, ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="section-label">Operations & Administrative Specialist</span>
            </div>

            <h1 className={`text-navy mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Mausam Patel
            </h1>

            <p className={`text-lg text-slate-500 mb-8 max-w-md transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Delivering excellence in high-volume environments through operational expertise and client-focused service.
            </p>

            <div className={`flex flex-wrap gap-6 mb-10 text-sm text-slate-500 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                Bedford, NS
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                (514) 573-9139
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                mausampatel0406@gmail.com
              </span>
            </div>

            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a href="#contact" className="btn-primary">
                Get in Touch
              </a>
              <a href="/Mausam_Patel_Resume.pdf" download className="inline-flex items-center gap-2 px-6 py-3 text-navy font-medium text-sm hover:text-navy-light transition-colors">
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-4 bg-slate-200 rounded-full blur-2xl opacity-40" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-100">
                  <img src="/profile-photo.png" alt="Mausam Patel" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <a href="#about" className="flex flex-col items-center gap-2 text-slate-400 hover:text-navy transition-colors">
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
