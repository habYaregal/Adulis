import axios from "axios";

export async function onBidSubmit(bidData) {
  return await axios.post("http://localhost:3000/api/submitbid", bidData);
}
export async function onCarrierBidGet() {
  return await axios.get("http://localhost:3000/api/getcarrierbid");
}
export async function onShipperBidGet() {
  return await axios.get("http://localhost:3000/api/getshipperbid");
}
export async function onUpdateBidStatus(id, status) {
    return await axios.put(`http://localhost:3000/api/bidstatusupdate/${id}`, { status });
  }