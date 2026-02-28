import { useEffect, useRef, useState } from 'react';
import { Award, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
}

const certifications: Certification[] = [
  {
    name: 'Certified Associate in Project Management (CAPM)',
    issuer: 'Project Management Institute',
    date: 'Jan 2026 - Jan 2029',
    description: 'Global professional certification demonstrating knowledge of project management principles, processes, and best practices.',
    skills: ['Project Planning', 'Risk Management', 'Stakeholder Communication'],
  },
  {
    name: 'Lean Six Sigma Green Belt',
    issuer: 'The Council for Six Sigma Certification',
    date: 'Certified',
    description: 'Process improvement certification focused on reducing waste, improving efficiency, and delivering consistent quality.',
    skills: ['Process Optimization', 'Quality Control', 'Continuous Improvement'],
  },
  {
    name: 'Microsoft Excel Expert',
    issuer: 'Skillspass Bluedrop',
    date: 'Certified',
    description: 'Expert-level skills in advanced formulas, pivot tables, dashboard creation, and financial modeling.',
    skills: ['Advanced Formulas', 'Data Analysis', 'Macro Automation'],
  },
  {
    name: 'Supply Chain Management',
    issuer: 'Government of Nova Scotia',
    date: 'Certified',
    description: 'Professional certification in supply chain principles, logistics management, and procurement strategies.',
    skills: ['Inventory Management', 'Vendor Relations', 'Process Optimization'],
  },
  {
    name: 'Data Analytics',
    issuer: 'Digital Nova Scotia',
    date: 'Certified',
    description: 'Comprehensive training in data analysis techniques and tools for business intelligence.',
    skills: ['Data Visualization', 'Statistical Analysis', 'Reporting'],
  },
  {
    name: 'AI Business Transformation',
    issuer: 'SkillsOnlineNS',
    date: 'Nov 2025',
    description: 'Latest certification in AI applications for business process improvement and digital transformation.',
    skills: ['AI Integration', 'Digital Strategy', 'Business Innovation'],
  },
];

const additionalCerts = ['Digital Ethics and Privacy', 'WHMIS', 'Skills for Communication Success'];

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextCert = () => setActiveIndex((prev) => (prev + 1) % certifications.length);
  const prevCert = () => setActiveIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  const activeCert = certifications[activeIndex];

  return (
    <section ref={sectionRef} id="certifications" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Professional Certifications</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Credentials & Learning</h2>
          </div>

          <div className={`mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="card p-8">
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm text-slate-400">{activeIndex + 1} / {certifications.length}</span>
                <div className="flex gap-2">
                  <button onClick={prevCert} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"><ChevronLeft className="w-5 h-5 text-slate-500" /></button>
                  <button onClick={nextCert} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"><ChevronRight className="w-5 h-5 text-slate-500" /></button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-24 h-24 rounded-2xl bg-navy flex items-center justify-center text-white">
                    <Award className="w-10 h-10" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-semibold text-navy mb-2">{activeCert.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{activeCert.issuer}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{activeCert.date}</span>
                  </div>
                  <p className="text-slate-600 mb-4">{activeCert.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeCert.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {certifications.map((cert, index) => (
              <button
                key={cert.name}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${activeIndex === index ? 'border-navy bg-navy/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <h4 className="text-sm font-medium text-navy line-clamp-2 mb-1">{cert.name}</h4>
                <p className="text-xs text-slate-400">{cert.issuer}</p>
              </button>
            ))}
          </div>

          <div className={`text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-slate-400 mb-3">Additional Certifications</p>
            <div className="flex flex-wrap justify-center gap-2">
              {additionalCerts.map((cert) => (
                <span key={cert} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">{cert}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
