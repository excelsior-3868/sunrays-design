import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sunrays Pre School | Nurturing Young Minds',
  description: 'The best preschool in Kathmandu for early childhood education. We provide a fun, safe, and enriching environment for your child\'s growth.',
  keywords: [
    'sunrays preschool',
    'best preschool kathmandu',
    'kindergarten nepal',
    'early education',
    'childcare dallu',
    'play group nursery'
  ],
};



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
