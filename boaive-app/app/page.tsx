import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import ServiceCards from '@/components/ServiceCards';
import TreatmentCarousel from '@/components/TreatmentCarousel';
import TreatmentFinder from '@/components/TreatmentFinder';
import ScrollStory from '@/components/ScrollStory';
import BeforeAfter from '@/components/BeforeAfter';
import DoctorSection from '@/components/DoctorSection';
import ReviewCarousel from '@/components/ReviewCarousel';
import Gallery from '@/components/Gallery';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServiceCards />
      <TreatmentCarousel />
      <TreatmentFinder />
      <ScrollStory />
      <BeforeAfter />
      <DoctorSection />
      <ReviewCarousel />
      <Gallery />
    </>
  );
}
