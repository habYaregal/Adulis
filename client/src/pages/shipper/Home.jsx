import ShipperNavigation from "../../components/ShipperNav";
import ShipperHero from "./SipperHero";
import StepGuide from "./StepGuide";
import Footer from "../../components/Footer";
import StarredShipper from "./StarredShipper";
import Contact from "../landing/Contact";
import ShipperStat from "./ShipperStat";
import ShipperTestimony from "./ShipperTestimony";


const ShipperHome =()=>{
    return(
        <>
            <ShipperNavigation/>
            <ShipperHero/>
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