import { useEffect, useRef, useState } from 'react';
import { TrendingDown, FileCheck, DollarSign, Users } from 'lucide-react';

interface Achievement {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    value: '20%',
    numericValue: 20,
    suffix: '%',
    label: 'Waste Reduction',
    description: 'Reduced perishable waste through data-driven inventory management',
    icon: <TrendingDown className="w-6 h-6" />,
  },
  {
    value: '50+',
    numericValue: 50,
    suffix: '+',
    label: 'Monthly Invoices',
    description: 'Processed with 100% accuracy, maintaining vendor relationships',
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    value: '$600K',
    numericValue: 600,
    suffix: 'K',
    label: 'Budget Oversight',
    description: 'Annual budget management with fiscal responsibility',
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    value: 'Multiple',
    numericValue: 0,
    suffix: '',
    label: 'Training Programs',
    description: 'Designed for teams of 6-45 employees',
    icon: <Users className="w-6 h-6" />,
  },
];

const AnimatedNumber = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current && value > 0) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const current = Math.min(value, increment * step);
        setCount(Math.floor(current));
        if (step >= steps) {
          setCount(value);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  if (value === 0) return <span>Multiple</span>;
  return <span>{suffix === 'K' ? `$${count}K` : `${count}${suffix}`}</span>;
};

const Achievements = () => {
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

  return (
    <section ref={sectionRef} id="achievements" className="py-24 lg:py-32 bg-navy">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs font-medium tracking-[0.15em] uppercase text-white/50 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Measurable Impact</span>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Key Achievements</h2>
            <p className={`text-white/60 max-w-xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Demonstrated ability to deliver measurable results across multiple organizations</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className={`text-center p-6 rounded-xl bg-white/5 border border-white/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 text-white/70 mb-4">{achievement.icon}</div>
                <div className="text-3xl md:text-4xl font-semibold text-white mb-2 tabular-nums">
                  <AnimatedNumber value={achievement.numericValue} suffix={achievement.suffix} isVisible={isVisible} />
                </div>
                <h3 className="text-white font-medium mb-2">{achievement.label}</h3>
                <p className="text-white/50 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
