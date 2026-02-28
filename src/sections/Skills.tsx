import { useEffect, useRef, useState } from 'react';
import { Users, MessageCircle, BarChart3, ClipboardList } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Client Service',
    icon: <MessageCircle className="w-5 h-5" />,
    skills: [
      { name: 'Front-Line Service', level: 95 },
      { name: 'Relationship Building', level: 90 },
      { name: 'De-escalation', level: 88 },
      { name: 'Cultural Sensitivity', level: 92 },
    ],
  },
  {
    title: 'Leadership',
    icon: <Users className="w-5 h-5" />,
    skills: [
      { name: 'Team Coordination', level: 90 },
      { name: 'Training & Development', level: 85 },
      { name: 'Scheduling', level: 92 },
      { name: 'Vendor Relations', level: 88 },
    ],
  },
  {
    title: 'Operations',
    icon: <ClipboardList className="w-5 h-5" />,
    skills: [
      { name: 'Data Analysis', level: 90 },
      { name: 'Budget Management', level: 88 },
      { name: 'Process Optimization', level: 85 },
      { name: 'Inventory Management', level: 90 },
    ],
  },
  {
    title: 'Technical',
    icon: <BarChart3 className="w-5 h-5" />,
    skills: [
      { name: 'Microsoft Excel', level: 95 },
      { name: 'Microsoft Word', level: 88 },
      { name: 'PowerPoint', level: 85 },
      { name: 'Sage ERP', level: 82 },
    ],
  },
];

const SkillBar = ({ name, level, delay, isVisible }: { name: string; level: number; delay: number; isVisible: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-600">{name}</span>
        <span className="text-sm text-slate-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-navy rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

const Skills = () => {
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
    <section ref={sectionRef} id="skills" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Core Competencies</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Skills & Expertise</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.title} className={`card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${200 + categoryIndex * 100}ms` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-navy">{category.title}</h3>
                </div>
                <div>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={400 + categoryIndex * 100 + skillIndex * 100} isVisible={isVisible} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
