import { performRequest } from "../lib/datocms";
import { GET_HOME } from "../graphql/homeQuery";
import { GET_SEO } from "../graphql/seoQuery";
import Seo from "@/components/portfolio/Seo";
import Hero from "@/components/portfolio/Hero";
import Footer from "@/components/portfolio/Footer";
import BadgeSection from "@/components/portfolio/BadgeSection";

export default async function Home() {
  const seoData = await performRequest<any>(GET_SEO);
  const homeData = await performRequest<any>(GET_HOME);

  const seo: any = seoData;
  const home: any = homeData.allHomePages[0];

  console.log(home);

  return (
    <>
      {seo && <Seo title={seo.title} description={seo.description} />}
      {home && (
        <Hero
          title={home.heroTitle}
          subtitle={home.heroSubtitle}
          image={home.heroImage[0].url}
        />
      )}
      {/* {home && <BadgeSection badges={home.badges} />} */}
      {/* <Footer /> */}
    </>
  );
}
