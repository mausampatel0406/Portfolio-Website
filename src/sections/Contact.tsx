import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, Briefcase, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Bedford, NS B4A 3X2' },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '(514) 573-9139', href: 'tel:5145739139' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'mausampatel0406@gmail.com', href: 'mailto:mausampatel0406@gmail.com' },
  ];

  const targetRoles = ['Client Service Representative', 'Administrative Assistant', 'Operations Coordinator'];

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-label transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Get In Touch</span>
            <h2 className={`section-headline transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Let&apos;s Connect</h2>
            <p className={`text-slate-500 max-w-xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Eager to bring my expertise to serve Nova Scotia communities through public service</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className={`lg:col-span-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">{item.icon}</div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
                      {item.href ? <a href={item.href} className="text-navy font-medium hover:underline">{item.value}</a> : <p className="text-navy font-medium">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-navy">Target Roles</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {targetRoles.map((role) => (
                    <span key={role} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm">{role}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-navy/5 rounded-xl border border-navy/10">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-navy" />
                  <span className="text-sm font-medium text-navy">Immediate Availability</span>
                </div>
                <p className="text-sm text-slate-500">Ready to contribute from day one</p>
              </div>
            </div>

            <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-white rounded-xl p-6 lg:p-8 border border-slate-100">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-navy">Name *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="border-slate-200 focus:border-navy focus:ring-navy" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-navy">Email *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="border-slate-200 focus:border-navy focus:ring-navy" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-navy">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" className="border-slate-200 focus:border-navy focus:ring-navy" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-navy">Message *</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="How can I help you?" required rows={4} className="border-slate-200 focus:border-navy focus:ring-navy resize-none" />
                    </div>

                    <Button type="submit" className="w-full btn-primary gap-2">
                      <Send className="w-4 h-4" />Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-navy" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">Message Sent</h3>
                    <p className="text-slate-500 text-sm">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
