import { db } from "../db/index.js";

export const submitBid = async (req, res) => {
  try {
    const { amount, remark, shipmentId } = req.body;

    const result = await db.query(
      "INSERT INTO bids (shipment_id, bid_amount, carrier_remark, carrier_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [shipmentId, amount, remark, 22, "pending"]
    );

    // Send success response to client
    res.status(201).json({
      message: "Bid submited successfully!",
      shipment: result.rows[0],
    });
  } catch (error) {
    // Handle errors and send error response
    console.error("Error posting shipment:", error);
    res.status(500).json({
      message: "An error occurred while submitting a bid.",
    });
  }
};
export const carrierBid = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT s.title, s.origin,s.destination,b.bid_amount,b.status FROM shipments s INNER JOIN bids b ON s.id = b.shipment_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};
