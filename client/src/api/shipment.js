import axios from 'axios'

export async function onShipmentPost(shipmentData) {
    return await axios.post('http://localhost:3000/api/postShipment', shipmentData)
  }
  