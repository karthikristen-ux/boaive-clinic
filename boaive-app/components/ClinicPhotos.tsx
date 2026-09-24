import { galleryImages } from '@/config/site-config';

export default function ClinicPhotos() {
  return (
    <section className="section section--tint">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Inside the clinic</p>
          <h2 className="h2">Clean, calm and comfortable.</h2>
        </div>
        <div className="photo-strip">
          {galleryImages.map(img => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={img.id} src={img.src} alt={img.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
