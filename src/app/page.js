import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DestinationList } from "@/components/homepage/components/DestinationList";
import { Hero } from "@/components/homepage/components/Hero";
import {
  AFFORDABLE_DESTINATION,
  TOP_RATED_DESTINATION,
  TRENDING_DESTINATION,
} from "@/utils/constants";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <DestinationList type={TOP_RATED_DESTINATION} />
      <DestinationList type={TRENDING_DESTINATION} />
      <DestinationList type={AFFORDABLE_DESTINATION} />
      <Footer />
    </main>
  );
}
