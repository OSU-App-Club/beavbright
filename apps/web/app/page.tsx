import { About } from "@/components/about";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scrollToTop";

export default async function Page() {
  return (
    <>
      <main className="flex flex-col items-center">
        <Navbar />
        <Hero />
        <div className="mt-24">
          <About />
          <FAQ />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
