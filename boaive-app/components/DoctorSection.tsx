import { defaultConfig as config } from '@/config/site-config';

export default function DoctorSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Our doctors</p>
          <h2 className="h2">Meet the team.</h2>
          <p className="lead">Qualified specialists who take the time to listen and explain.</p>
        </div>
        <div className="doctors">
          {config.doctors.map(doc => (
            <article className="doctor" key={doc.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={doc.photo} alt={doc.name} loading="lazy" />
              <div>
                <h3>{doc.name}</h3>
                <p className="doctor-qual">{doc.qualification}</p>
                <p>{doc.specialization}</p>
                <p className="doctor-exp">{doc.experience} experience</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
