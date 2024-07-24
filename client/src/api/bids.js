import axios from "axios";

export async function onBidSubmit(bidData) {
  return await axios.post("http://localhost:3000/api/submitbid", bidData);
}
export const onCarrierBidGet = (userId) => {
  return axios.get("http://localhost:3000/api/getcarrierbid", { params: { carrier_id: userId } });
};
export const onShipperBidGet = (userId) => {
  return axios.get("http://localhost:3000/api/getshipperbid", { params: { shipper_id: userId } });
};
export async function onUpdateBidStatus(id, status) {
    return await axios.put(`http://localhost:3000/api/bidstatusupdate/${id}`, { status });
  }