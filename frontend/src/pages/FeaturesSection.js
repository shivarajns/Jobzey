import "./FeaturesSection.css";

function FeaturesSection() {
  const features = [
    {
      icon: "🚀",
      title: "Quick & easy apply",
      description:
        "Apply to jobs in just a few clicks. No lengthy forms, no repetitive data entry — just find the role and hit apply.",
    },
    {
      icon: "🌐",
      title: "Jobs across every domain",
      description:
        "Whether you're in tech, finance, design, healthcare, or anything in between — Jobzey has opportunities for every field.",
    },
    {
      icon: "✨",
      title: "Simple & user friendly",
      description:
        "A clean, distraction-free experience built for job seekers. Find what you need fast without getting lost in complexity.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__label">Features</span>
          <h2 className="section__title">Everything you need to land the job</h2>
          <p className="section__subtitle">
            Jobzey brings together the tools job seekers actually need — in one clean, focused platform.
          </p>
        </div>

        <div className="features__grid">
          {features.map(function (feature, index) {
            return (
              <div
                className="feature-card"
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
                <div className="feature-card__line"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
