import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sunrays Pre School - Nurturing Young Minds in Kathmandu',
  description: 'Sunrays Pre School provides a fun, safe, and enriching environment for your child\'s early education in Kathmandu. Expert teachers, modern facilities, and engaging programs for holistic development.',
  keywords: ['preschool kathmandu', 'kindergarten nepal', 'early education', 'childcare dallu', 'best preschool kathmandu', 'play group nursery'],
};

export default function Home() {
  return (
    <>
      {/* Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Sunrays Pre School",
            "alternateName": "Sun Rays Pre-School",
            "description": "Quality early childhood education and care for children aged 2-6 years in Kathmandu, Nepal",
            "url": "https://sunrayspreschool.com",
            "logo": "https://sunrayspreschool.com/sunrays-logo.png",
            "image": "https://sunrayspreschool.com/sunrays-logo.png",
            "telephone": "+977-1-4282926",
            "email": "info.sunrayspreschool@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Purnadevi Marg, Dallu",
              "addressLocality": "Kathmandu",
              "addressRegion": "Bagmati",
              "postalCode": "44600",
              "addressCountry": "NP"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "27.7106803",
              "longitude": "85.29338779999999"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "14:45"
            },
            "priceRange": "$$",
            "sameAs": [
              "https://www.facebook.com/share/1Cu5owpEjK/"
            ]
          })
        }}
      />
      <Hero />
      <Features />
      <AboutSection />
      <FacilitiesSection />
      <ServicesSection />
      <EnrollmentSection />
    </>
  );
}
