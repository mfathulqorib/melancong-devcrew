import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AfordableDestination } from "@/components/homepage/components/AfordableDestination";
import { Hero } from "@/components/homepage/components/Hero";
import { TopRateDestination } from "@/components/homepage/components/TopRateDestination";
import { TrendingDestination } from "@/components/homepage/components/TrendingDestination";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TopRateDestination />
      <TrendingDestination />
      <AfordableDestination />
      <Footer />
    </main>
  );
}
