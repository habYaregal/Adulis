import { db } from "../db/index.js";

export const submitBid = async (req, res) => {
  try {
    const { amount, remark, shipmentId,carrier_id } = req.body;
    const result = await db.query(
      "INSERT INTO bids (shipment_id, bid_amount, carrier_remark, carrier_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [shipmentId, amount, remark, carrier_id, "pending"]
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
    const carrierId = req.query.carrier_id;
    const result = await db.query(
      "SELECT s.title, s.origin,s.destination,b.bid_amount,b.status FROM shipments s INNER JOIN bids b ON s.id = b.shipment_id WHERE b.carrier_id = $1",[carrierId]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const shipperBid = async (req, res) => {
    try {
      const shipperId = req.query.shipper_id;
      console.log(shipperId)
      const result = await db.query(
        "SELECT s.title, s.img_url, b.bid_amount,b.id, c.f_name, c.l_name, c.city FROM bids b JOIN shipments s ON b.shipment_id = s.id JOIN carriers c ON b.carrier_id = c.id where b.status!=$1 AND s.shipper_id=$2",['rejected',shipperId]
      );
      res.json(result.rows);
    } catch (error) {
      console.log(error.message);
    }
  };
export const bidStatus = async (req, res) => {
    const id = req.params.id; 
    const { status } = req.body;

    console.log(status);
    if (!status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
  
    try {
      const result = await db.query(
        'UPDATE bids SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Bid not found' });
      }
  
      return res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating bid status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };