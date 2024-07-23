import ShipperNavigation from "../../components/ShipperNav";
import ShipperHero from "./SipperHero";
import StepGuide from "./StepGuide";
import Footer from "../../components/Footer";
import StarredShipper from "./StarredShipper";
import Contact from "../landing/Contact";
import ShipperStat from "./ShipperStat";
import ShipperTestimony from "./ShipperTestimony";
import UserProfile from "../authentication/example";


const ShipperHome =()=>{
    return(
        <>
            <ShipperNavigation/>
            <ShipperHero/>
            <UserProfile/>
            <ShipperStat/>
            <StarredShipper/>
            <StepGuide/>
            <ShipperTestimony/>
            <Contact/>
            <Footer/>
        </>
    );
}

export default ShipperHome;