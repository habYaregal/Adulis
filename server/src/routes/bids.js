import { Router } from "express";
import { carrierBid, submitBid } from "../controllers/bids.js";

const router= Router();

router.post('/submitbid',submitBid);
router.get('/getcarrierbid',carrierBid);

export const bidsRoutes = router