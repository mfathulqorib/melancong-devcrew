import { Footer } from "@/components/Footer";
import { AfordableDestination } from "@/components/homepage/components/AfordableDestination";
import { Hero } from "@/components/homepage/components/Hero";
import { TopRateDestination } from "@/components/homepage/components/TopRateDestination";
import { TrendingDestination } from "@/components/homepage/components/TrendingDestination";
import { AccountNavbar } from "@/components/AccountNavbar";

export default function Home() {
  return (
    <main>
      <AccountNavbar />
      <Hero />
      <TopRateDestination />
      <TrendingDestination />
      <AfordableDestination />
      <Footer />
    </main>
  );
}
