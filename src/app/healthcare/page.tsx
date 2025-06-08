import { Breadcrumbs } from "@/components";
import { Cases, ContactForm, Technologies, Values, ReviewsBlock, Placeholder } from '@/components/blocks';

export default function HealthcarePage() {
  return (
    <div>
      <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50  xl:px-c-200 xl:py-c-100 ">
        <Breadcrumbs />
        <Placeholder>
          Healthcare banner
        </Placeholder>
      </div>
      <ContactForm />
      <Cases />
      <Technologies />
      <Values />
      <ReviewsBlock />
    </div>
  );
}
