import { Router } from "express";
import { getShipment, postShipment } from "../controllers/shipment.js";

const router= Router();

router.post('/postShipment',postShipment);
router.get('/getShipment',getShipment);

export const shipmentRoutes = router