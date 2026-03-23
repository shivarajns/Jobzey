import "./HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description:
        "Sign up and build your profile in minutes. Add your skills, experience, and the kind of roles you're looking for.",
    },
    {
      number: "02",
      title: "Browse & find jobs",
      description:
        "Search across hundreds of listings from every domain. Filter by location, salary, experience level, and more.",
    },
    {
      number: "03",
      title: "Apply and track",
      description:
        "Apply directly through Jobzey and track every application in real time — from submission to offer.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__label">How it works</span>
          <h2 className="section__title">Three steps to your next role</h2>
          <p className="section__subtitle">
            Getting started takes less than 5 minutes. No credit card required.
          </p>
        </div>

        <div className="steps">
          {steps.map(function (step, index) {
            return (
              <div className="step" key={index}>
                <div className="step__number">{step.number}</div>
                <div className="step__content">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__desc">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="step__connector"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
