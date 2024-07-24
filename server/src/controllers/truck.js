import { db } from "../db/index.js";

export const postTruck = async (req, res) => {
  try {
    const { truckType,truckInfo,capacity,manufacturedYear,photoURL,licensePlate,userId } = req.body;
    const result = await db.query(
      "INSERT INTO truckprofiles (carrier_id, truck_type, truck_info, capacity, m_year,img_url,licence_plate) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *",
      [userId, truckType, truckInfo, capacity,manufacturedYear, photoURL,licensePlate]
    );
    res.status(201).json({
      message: "Truck posted successfully!",
      shipment: result.rows[0]
    });
  } catch (error) {
    console.error("Error posting truck:", error);
    res.status(500).json({
      message: "An error occurred while posting the truck."
    });
  }
};

export const getTruck = async (req, res) => {
    try {
      const result = await db.query(
        "SELECT c.f_name,c.l_name,c.city,tp.truck_type,tp.truck_info,tp.capacity,tp.img_url,tp.m_year,tp.licence_plate FROM carriers c INNER JOIN truckprofiles tp ON c.id = tp.carrier_id"
      );
      res.json(result.rows);
    } catch (error) {
      console.log(error.message);
    }
  };
