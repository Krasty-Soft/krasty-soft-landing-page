import {
  Banner,
  Cases,
  Difference,
  Faq,
  Industries,
  Opportunities,
  Services,
  Technologies,
} from "@/components/blocks";
import { getAllCases } from "@/lib/cases";
import { getAllJobs } from "@/lib/jobs";
import { COMPANY_FAQ } from "@/lib/faq";
import {
  generateAggregateRatingSchema,
  generateFAQSchema,
  StructuredData,
} from "@/lib/seo";

export default async function Home() {
  const cases = await getAllCases();
  const jobs = await getAllJobs();
  const isEmpty = jobs.length === 0;

  // Generate aggregate rating schema for reviews/testimonials
  const ratingSchema = generateAggregateRatingSchema({
    ratingValue: 5,
    reviewCount: 11, // Based on "11 Client Reviews" in banner
    bestRating: 5,
    worstRating: 1,
  });

  return (
    <>
      <StructuredData data={[ratingSchema, generateFAQSchema(COMPANY_FAQ)]} />
      <Banner />
      <Services />
      <Difference />
      <Industries />
      <Technologies />
      <Cases cases={cases} />
      <Faq items={COMPANY_FAQ} />
      <Opportunities isEmpty={isEmpty} jobs={jobs} />
    </>
  );
}
