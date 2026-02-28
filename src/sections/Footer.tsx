import { useEffect, useRef, useState } from 'react';
import { Download, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer ref={footerRef} className="py-12 bg-navy">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-xl font-semibold text-white mb-1">Mausam Patel</h3>
              <p className="text-white/50 text-sm">Operations & Administrative Specialist</p>
            </div>

            <nav className={`flex flex-wrap gap-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
              ))}
            </nav>

            <div className={`flex items-center gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <a href="https://www.linkedin.com/in/mausam-patel-capm-966a081a4/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:mausampatel0406@gmail.com" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
              <a href="/Mausam_Patel_Resume.pdf" download className="inline-flex items-center gap-2 px-4 py-2 bg-white text-navy text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
                <Download className="w-4 h-4" />Resume
              </a>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm text-white/40 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              &copy; {new Date().getFullYear()} Mausam Patel. All rights reserved.
            </p>
            <button onClick={scrollToTop} className={`flex items-center gap-2 text-sm text-white/40 hover:text-white transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Back to top<ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
