import {Banner, Difference, Footer, Header, Industries, Services} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-auto">
        <Banner />
        <Services />
        <Difference />
        <Industries />
      </main>
      <Footer />
    </>
  );
}
