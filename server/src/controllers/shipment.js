import { db } from "../db/index.js";

export const postShipment = async (req, res) => {
  try {
    const { title, origin, destination, weight, description, photoURL } = req.body;

    // Insert the shipment into the database
    const result = await db.query(
      "INSERT INTO shipments (shipper_id, title, origin, destination, description, weight, img_url,status) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [14, title, origin, destination, description, weight, photoURL,'open']
    );

    // Send success response to client
    res.status(201).json({
      message: "Shipment posted successfully!",
      shipment: result.rows[0]
    });
  } catch (error) {
    // Handle errors and send error response
    console.error("Error posting shipment:", error);
    res.status(500).json({
      message: "An error occurred while posting the shipment."
    });
  }
};

export const getShipment = async (req,res) =>{
    try{
        const result = await db.query("select * from shipments");
        res.json(result.rows);
    }catch(error){
        console.log(error.message);
    }
}
