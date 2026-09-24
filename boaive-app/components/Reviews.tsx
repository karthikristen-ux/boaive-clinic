import { Star } from 'lucide-react';
import { demoReviews } from '@/config/site-config';

export default function Reviews({ count = 3, tint = true }: { count?: number; tint?: boolean }) {
  return (
    <section className={`section ${tint ? 'section--tint' : ''}`}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Patient reviews</p>
          <h2 className="h2">What our patients say.</h2>
        </div>
        <div className="reviews">
          {demoReviews.slice(0, count).map(r => (
            <figure className="review" key={r.id}>
              <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <blockquote>{r.text}</blockquote>
              <figcaption className="review-by"><strong>{r.name}</strong> · {r.treatment}</figcaption>
            </figure>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 20 }}>Sample reviews shown for demonstration.</p>
      </div>
    </section>
  );
}
