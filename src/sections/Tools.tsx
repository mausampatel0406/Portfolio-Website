import { useEffect, useRef, useState } from 'react';
import { FileSpreadsheet, FileText, Presentation, Database, CreditCard, Check } from 'lucide-react';

interface Tool {
  name: string;
  level: string;
  icon: React.ReactNode;
  features: string[];
}

const tools: Tool[] = [
  {
    name: 'Microsoft Excel',
    level: 'Expert',
    icon: <FileSpreadsheet className="w-6 h-6" />,
    features: ['Advanced formulas & functions', 'Pivot tables & dashboards', 'Financial modeling', 'Macro automation'],
  },
  {
    name: 'Microsoft Word',
    level: 'Advanced',
    icon: <FileText className="w-6 h-6" />,
    features: ['Document creation', 'Report writing & SOPs', 'Template development', 'Mail merge'],
  },
  {
    name: 'PowerPoint',
    level: 'Advanced',
    icon: <Presentation className="w-6 h-6" />,
    features: ['Presentation design', 'Training materials', 'Data visualization', 'Multimedia integration'],
  },
  {
    name: 'Sage ERP',
    level: 'Advanced',
    icon: <Database className="w-6 h-6" />,
    features: ['Inventory management', 'Invoice processing', 'Financial records', 'Purchase orders'],
  },
  {
    name: 'POS Systems',
    level: 'Proficient',
    icon: <CreditCard className="w-6 h-6" />,
    features: ['Transaction processing', 'Sales analysis', 'Cash reconciliation', 'Performance tracking'],
  },
];

const Tools = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} id="tools" className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Tools & Systems</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Technical Proficiency</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, index) => (
              <div key={tool.name} className={`card p-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${200 + index * 80}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{tool.icon}</div>
                  <span className="px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full">{tool.level}</span>
                </div>
                <h3 className="text-base font-semibold text-navy mb-3">{tool.name}</h3>
                <ul className="space-y-2">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-500">
                      <Check className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`mt-12 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {['Data Analysis', 'Financial Reporting', 'Team Training', 'Process Optimization'].map((area) => (
              <span key={area} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm">{area}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
