import axios from "axios";

export async function onBidSubmit(bidData) {
  return await axios.post(
    "http://localhost:3000/api/submitbid",
    bidData
  );
}
export async function onCarrierBidGet() {
    return await axios.get(
      "http://localhost:3000/api/getcarrierbid"
    );
  }