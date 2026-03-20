import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
      </main>
    </>
  );
}
