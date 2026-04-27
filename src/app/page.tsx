import { BackgroundScene } from "@/components/layout/BackgroundScene";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CurrentWork } from "@/components/sections/CurrentWork";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { HireSimulator } from "@/components/sections/HireSimulator";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <div className="relative">
      <BackgroundScene />
      <Navbar />
      <main className="relative z-10 overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <CurrentWork />
        <HireSimulator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
