import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Terminal from "@/components/Terminal";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Terminal />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <footer className="bg-black border-t border-zinc-900 py-8 px-6 text-center">
        <p className="text-zinc-600 text-sm">
          © 2026 Vikash Jaiswal · Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </footer>
    </>
  );
}
