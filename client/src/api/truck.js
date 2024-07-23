import axios from "axios";

export async function onTruckPost(truckData) {
  return await axios.post(
    "http://localhost:3000/api/postTruck",
    truckData
  );
}
export async function onGetTrucks() {
  return await axios.get(
    "http://localhost:3000/api/getTruck"
  );
}
