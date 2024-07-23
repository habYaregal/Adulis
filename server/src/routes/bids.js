import { Router } from "express";
import { bidStatus, carrierBid, shipperBid, submitBid } from "../controllers/bids.js";

const router= Router();

router.post('/submitbid',submitBid);
router.get('/getcarrierbid',carrierBid);
router.get('/getshipperbid',shipperBid);
router.put('/bidstatusupdate/:id',bidStatus);

export const bidsRoutes = router