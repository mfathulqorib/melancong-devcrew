import { Footer } from "@/components/Footer";
import { AfordableDestination } from "@/components/homepage/components/AfordableDestination";
import { Hero } from "@/components/homepage/components/Hero";
import { TopRateDestination } from "@/components/homepage/components/TopRateDestination";
import { TrendingDestination } from "@/components/homepage/components/TrendingDestination";
import { AccountNavbar } from "@/components/AccountNavbar";
import { SECRET_KEY, TOKEN } from "@/utils/ApiUrl";
import { jwtExtract } from "@/utils/jwtExtract";
import { capitalizeEachWord, slugForUiApi } from "@/utils/sentenceTraversal";

export default function Home() {
  const payload = jwtExtract(TOKEN, SECRET_KEY);
  const { name, username, email } = payload;

  return (
    <main>
      <AccountNavbar
        name={capitalizeEachWord(name)}
        username={capitalizeEachWord(username)}
        slug={slugForUiApi(name)}
        email={email}
      />
      <Hero />
      <TopRateDestination />
      <TrendingDestination />
      <AfordableDestination />
      <Footer />
    </main>
  );
}
