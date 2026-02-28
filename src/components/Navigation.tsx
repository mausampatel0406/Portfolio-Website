import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'experience', 'skills', 'tools', 'certifications', 'achievements', 'education', 'references', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="text-lg font-semibold text-navy">Mausam Patel</a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`relative text-sm font-medium transition-colors ${activeSection === link.href.slice(1) ? 'text-navy' : 'text-slate-500 hover:text-navy'}`}>
                  {link.label}
                  {activeSection === link.href.slice(1) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-navy rounded-full" />}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a href="/Mausam_Patel_Resume.pdf" download className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors">
                <Download className="w-4 h-4" />Resume
              </a>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              {isMobileMenuOpen ? <X className="w-5 h-5 text-navy" /> : <Menu className="w-5 h-5 text-navy" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-white shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-20">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${activeSection === link.href.slice(1) ? 'bg-navy/5 text-navy' : 'text-slate-600 hover:bg-slate-50 hover:text-navy'}`}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <a href="/Mausam_Patel_Resume.pdf" download className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-navy text-white rounded-lg font-medium">
                <Download className="w-5 h-5" />Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
