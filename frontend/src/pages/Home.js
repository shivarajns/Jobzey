import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;
