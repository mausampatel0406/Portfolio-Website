import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Languages, Heart, Star } from 'lucide-react';

interface EducationItem {
  title: string;
  institution: string;
  period: string;
  location?: string;
  gpa?: string;
  description: string;
  icon: React.ReactNode;
}

const educationItems: EducationItem[] = [
  {
    title: 'Diploma in Global Supply Chain Management (AEC)',
    institution: 'Mas Matrix College',
    period: 'Jan 2020 - Dec 2021',
    location: 'Montreal',
    gpa: '3.7',
    description: 'Comprehensive program covering supply chain principles, logistics management, procurement strategies, and operational efficiency.',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    title: 'French Language Development',
    institution: 'Ongoing Studies',
    period: 'In Progress',
    description: 'Committed to becoming bilingual to better serve Nova Scotia diverse communities and support French-language service delivery.',
    icon: <Languages className="w-5 h-5" />,
  },
  {
    title: 'ISANS Personal Development',
    institution: 'Immigrant Services Association',
    period: 'Ongoing',
    description: 'Participating in wellness education and support programs to build resilience and navigate professional development.',
    icon: <Heart className="w-5 h-5" />,
  },
];

const Education = () => {
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
    <section ref={sectionRef} id="education" className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Education & Growth</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Learning Journey</h2>
          </div>

          <div className="space-y-6">
            {educationItems.map((item, index) => (
              <div key={item.title} className={`card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-1">{item.title}</h3>
                      <p className="text-slate-500">{item.institution}</p>
                    </div>
                  </div>
                  {item.gpa && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                      <Star className="w-4 h-4" />GPA {item.gpa}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3 ml-14">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{item.period}</span>
                  {item.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{item.location}</span>}
                </div>

                <p className="text-slate-600 ml-14">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
