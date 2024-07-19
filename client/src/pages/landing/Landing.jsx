import Footer from "../../components/Footer";
import AlternatingFeatures from "./AlternatingFeatures";
import Contact from "./Contact";
import Features from "./Features";
import Hero from "./Hero";
import Stats from "./Stats";
import Testimony from "./Testimonials";
import Users from "./Users";

const Landing=()=>{
    return (
        <>
        <Hero/>
        <Users/>
        <Features/>
        <Stats/>
        <AlternatingFeatures/>
        <Testimony/>
        <Contact/>
        <Footer/>
        </>
    )
}
export default Landing;