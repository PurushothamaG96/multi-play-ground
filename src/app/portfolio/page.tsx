import { performRequest } from "../../lib/datocms";
import { GET_HOME } from "../../graphql/homeQuery";
import { GET_SEO } from "../../graphql/seoQuery";
import Seo from "@/components/portfolio/Seo";
import Hero from "@/components/portfolio/Hero";
import Footer from "@/components/portfolio/Footer";
import BadgeSection from "@/components/portfolio/BadgeSection";
import Navbar from "@/components/navbar";

export default async function Home() {
  const homeData = await performRequest<any>(GET_HOME);
  const home: any = homeData.allHomePages[0];

  return (
    <>
      {home && (
        <>
          <Navbar logo={home.logo} />
          <Hero
            title={home.heroTitle}
            subtitle={home.heroSubtitle}
            image={home.heroImage[0].url}
            heroSub={home.heroSub}
          />
          <BadgeSection skills={home.skills} />
        </>
      )}

      <Footer />
    </>
  );
}
