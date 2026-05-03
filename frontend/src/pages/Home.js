import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import "./Home.css";
import JobSection from "../pages/JobsSection"

function Home() {
  return (
    <div className="home">
      <HeroSection />
      <JobSection/>
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;
