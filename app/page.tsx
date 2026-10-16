import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Process />
        <Projects />
        <TechStack />
        <Team />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
