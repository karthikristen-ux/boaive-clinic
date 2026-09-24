import Hero from '@/components/Hero';
import Treatments from '@/components/Treatments';
import WhyUs from '@/components/WhyUs';
import BeforeAfter from '@/components/BeforeAfter';
import DoctorSection from '@/components/DoctorSection';
import Reviews from '@/components/Reviews';
import ClinicPhotos from '@/components/ClinicPhotos';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Treatments />
      <WhyUs />
      <BeforeAfter />
      <DoctorSection />
      <Reviews />
      <ClinicPhotos />
      <Faq />
      <CtaBand />
    </>
  );
}
