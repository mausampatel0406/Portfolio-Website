import { useEffect, useRef, useState } from 'react';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

interface StatProps {
  end: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}

const AnimatedStat = ({ end, suffix, label, icon, delay, isVisible }: StatProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const current = Math.min(end, increment * step);
        setCount(Math.floor(current));
        if (step >= steps) {
          setCount(end);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, end]);

  return (
    <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-500 mb-4">
        {icon}
      </div>
      <div className="stat-number mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
};

const About = () => {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { end: 5, suffix: '+', label: 'Years Experience', icon: <Calendar className="w-5 h-5" /> },
    { end: 45, suffix: '', label: 'Max Team Size', icon: <Users className="w-5 h-5" /> },
    { end: 2, suffix: 'M+', label: 'Revenue Managed', icon: <DollarSign className="w-5 h-5" /> },
    { end: 100, suffix: '+', label: 'Daily Customers', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>About Me</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Client-Focused Professional
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="text-slate-600 mb-6">
                Experienced Client Service & Administrative Professional with <span className="text-navy font-medium">5+ years</span> of proven expertise in high-volume customer-facing environments, front-line service delivery, and administrative coordination.
              </p>
              <p className="text-slate-600 mb-6">
                Passionate about helping people and ensuring positive client experiences. Skilled in managing challenging conversations, de-escalation techniques, and building rapport with diverse clientele.
              </p>
              <p className="text-slate-600">
                <span className="text-navy font-medium">Advanced Excel proficiency</span> with demonstrated capability in data analysis, reporting, and process optimization.
              </p>
            </div>

            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h3 className="text-navy font-semibold mb-4">Core Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {['Client Service Excellence', 'Communication', 'Problem Solving', 'Attention to Detail', 'Team Leadership', 'Data Analysis'].map((strength) => (
                  <span key={strength} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12 border-t border-slate-100 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} end={stat.end} suffix={stat.suffix} label={stat.label} icon={stat.icon} delay={500 + index * 100} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
