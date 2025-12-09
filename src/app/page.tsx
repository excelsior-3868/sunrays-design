import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import EnrollmentSection from "@/components/EnrollmentSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AboutSection />
      <FacilitiesSection />
      <ServicesSection />
      <EnrollmentSection />
    </>
  );
}
