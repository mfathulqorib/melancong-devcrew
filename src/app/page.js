import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/homepage/components/Hero";
import { Reviews } from "@/components/homepage/components/Reviews";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Reviews />
      <Footer />
    </main>
  );
}
