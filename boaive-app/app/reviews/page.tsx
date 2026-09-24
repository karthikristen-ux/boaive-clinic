import ReviewCarousel from '@/components/ReviewCarousel';

export default function ReviewsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 36px)' }}>
      <section className="section-padding pb-0">
        <div className="container-main">
          <p className="text-eyebrow mb-4">REVIEWS</p>
          <h1 className="heading-hero max-w-3xl">
            People we&apos;ve cared for.
          </h1>
          <p className="text-body-lg mt-6 max-w-xl">
            Hear from patients who have experienced our care firsthand.
          </p>
        </div>
      </section>
      <ReviewCarousel />
    </div>
  );
}
