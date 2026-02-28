import { useEffect, useRef, useState } from 'react';
import { Mail, Phone } from 'lucide-react';

interface Reference {
  name: string;
  title: string;
  company: string;
  relationship: string;
  period: string;
  email: string;
  phone: string;
  initials: string;
}

const references: Reference[] = [
  {
    name: 'Rav Nagar',
    title: 'Store Manager',
    company: 'Farm Boy',
    relationship: 'Former Supervisor',
    period: 'Jun 2023 - Jan 2024',
    email: 'yongesilvermaplestoremanager@farmboy.ca',
    phone: '(905) 313-1039',
    initials: 'RN',
  },
  {
    name: 'Cory Leonard',
    title: 'Chef Manager',
    company: 'Farm Boy',
    relationship: 'Former Manager',
    period: 'Jun 2023 - Jan 2024',
    email: 'yongesilvermaplechefmgr@farmboy.ca',
    phone: '(647) 828-9847',
    initials: 'CL',
  },
  {
    name: 'Sejal Bharadia',
    title: 'Manager',
    company: 'Subway',
    relationship: 'Former Supervisor',
    period: 'Jan 2022 - Jun 2023',
    email: 'bharadia@hotmail.com',
    phone: '(647) 836-4499',
    initials: 'SB',
  },
];

const References = () => {
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
    <section ref={sectionRef} id="references" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Endorsements</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Professional References</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {references.map((reference, index) => (
              <div key={reference.name} className={`card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white font-semibold text-sm">{reference.initials}</div>
                  <div>
                    <h3 className="font-semibold text-navy">{reference.name}</h3>
                    <p className="text-sm text-slate-500">{reference.title}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-slate-500">{reference.company}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded">{reference.relationship}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <a href={`mailto:${reference.email}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy transition-colors">
                    <Mail className="w-4 h-4" /><span className="truncate">{reference.email}</span>
                  </a>
                  <a href={`tel:${reference.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy transition-colors">
                    <Phone className="w-4 h-4" />{reference.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-slate-400">Additional references available upon request</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
