import CarrierNav from "../../components/CarrierNav";
import Footer from "../../components/Footer";
import CarrierHero from "./CarrierHero";
import MyComponent from "./Example";
import ShipmentList from "./ShipmentList";
import SubmitBid from "./SubmitBid";

const CarrierHome=()=>{
    return(
        <>
        <CarrierNav/>
        <CarrierHero/>
        <ShipmentList/>
        <SubmitBid/>
        {/* <MyComponent/> */}
        <Footer/>
        </>
    )
}

export default CarrierHome;