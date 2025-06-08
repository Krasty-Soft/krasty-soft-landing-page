import { Cases, ContactForm, Placeholder } from "@/components/blocks";

export default function InsurancePage() {
  return (
    <div>
      <Placeholder variant={'paper'} size={'medium'}>
        Insurance banner
      </Placeholder>
      <ContactForm isDark />
      <Cases />
    </div>
  );
}
