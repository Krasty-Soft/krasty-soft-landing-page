import { Breadcrumbs } from "@/components";
import { Cases, ContactForm, Industries, Features, Awards, UseCases } from "@/components/blocks";

export default function RetoolPage() {
  return (
    <div>
      <div className="container bg-black rounded-b-2xl text-white px-4 pt-5 pb-c-60 md:pb-20 md:px-8 md:pt-8 lg:px-c-50 lg:pb-28 xl:px-c-200">
        <Breadcrumbs isDark />
        <h1 className="text-1xl mt-8 mb-10 md:mb-c-60 md:text-3xl-plus lg:mt-14 lg:mb-10 xl:mt-c-60 xl:mb-28 xl:text-4xl-plus font-medium tracking-wider">Retool development</h1>
        <p className="font-semibold tracking-wider mb-5 md:text-lg lg:mb-6 lg:text-xl xl:text-3xl">👨🏻‍💻 Opt for the Retool No-Code Platform Services</p>
        <p className="text-sm leading-loose	 tracking-wider xl:text-lg">
          Optimal Retool solutions for rapid and real-time internal
          tool development empower teams to efficiently build custom
          applications without extensive coding knowledge, allowing
          for seamless integration of data sources, intuitive user
          interfaces, and agile iterations.
        </p>
      </div>
      <UseCases />
      <Cases />
      <ContactForm isDark />
      <Features />
      <Awards />
      <Industries />
    </div>
  );
}
