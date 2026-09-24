import DoctorSection from '@/components/DoctorSection';
import WhyUs from '@/components/WhyUs';
import ClinicPhotos from '@/components/ClinicPhotos';
import CtaBand from '@/components/CtaBand';

export const metadata = { title: 'About — Boaive Clinic' };

export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">About the clinic</p>
            <h1 className="h1">Personal care, from a team you can trust.</h1>
            <p className="lead">
              Boaive Clinic brings dental, hair and skin specialists together in Mahalingapuram, so your care is
              connected and consistent. We keep things simple: listen carefully, explain clearly and treat only what is needed.
            </p>
          </div>
        </div>
      </section>
      <DoctorSection />
      <WhyUs />
      <ClinicPhotos />
      <CtaBand />
    </>
  );
}
