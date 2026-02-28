import './App.css';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Tools from './sections/Tools';
import Certifications from './sections/Certifications';
import Achievements from './sections/Achievements';
import Education from './sections/Education';
import References from './sections/References';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Tools />
        <Certifications />
        <Achievements />
        <Education />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
