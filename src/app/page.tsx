import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { Process } from "@/components/Process/Process";
import { Benefits } from "@/components/Benefits/Benefits";
import { About } from "@/components/About/About";
import { CtaBanner } from "@/components/CtaBanner/CtaBanner";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Process />
        <Benefits />
        <About />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
