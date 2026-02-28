import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface ExperienceItem {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  isCurrent?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    position: 'Store Manager',
    company: 'Cows Ice Cream',
    period: 'May 2024 - Present',
    location: 'Halifax, NS',
    description: 'Managing $2M+ revenue, 20+ team members, client service & marketing',
    highlights: ['100+ daily customer interactions', 'Schedule 20+ employees', 'Excel-based KPI tracking', '$600K budget oversight'],
    isCurrent: true,
  },
  {
    position: 'Department Manager',
    company: "Pete's Frootique",
    period: 'Jan 2024 - Oct 2024',
    location: 'Halifax, NS',
    description: 'Managed deli/cheese department with 40-45 staff',
    highlights: ['Created daily schedules', 'Designed training programs', 'Prepared weekly reports', 'Processed 30+ monthly invoices'],
  },
  {
    position: 'Assistant Department Manager',
    company: 'Farm Boy',
    period: 'Jun 2023 - Jan 2024',
    location: 'Richmond Hill, ON',
    description: 'Supported daily operations and special events',
    highlights: ['Maintained SOPs and documentation', 'Managed staffing records', 'Recruited and trained team', 'Prepared operational reports'],
  },
  {
    position: 'Store Manager',
    company: 'Subway',
    period: 'Jan 2022 - Jun 2023',
    location: 'Guelph, ON',
    description: 'Managed administrative activities including scheduling',
    highlights: ['Customer relations & complaints', 'Budgets & financial reporting', 'POS data analysis', 'Staff training & meetings'],
  },
  {
    position: 'Restaurant Manager',
    company: "Cora's",
    period: 'Jan 2020 - Dec 2021',
    location: 'Cornwall, ON',
    description: 'Led daily restaurant operations for 15 employees',
    highlights: ['Front-of-house excellence', 'Promotional events', 'Performance tracking', 'Inventory management'],
  },
];

const Experience = () => {
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
    <section ref={sectionRef} id="experience" className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Professional Experience</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Career Journey</h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200" />
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={`${exp.company}-${exp.period}`} className={`relative pl-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                  <div className={`absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-1/2 ${exp.isCurrent ? 'bg-navy' : 'bg-slate-300'}`} />
                  {exp.isCurrent && <div className="absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-1/2 bg-navy animate-ping" />}
                  
                  <div className="card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-navy">{exp.position}</h3>
                        <p className="text-slate-500">{exp.company}</p>
                      </div>
                      {exp.isCurrent && <span className="px-3 py-1 bg-navy text-white text-xs font-medium rounded-full">Current</span>}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{exp.period}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{exp.location}</span>
                    </div>

                    <p className="text-slate-600 text-sm mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight) => (
                        <span key={highlight} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">{highlight}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
