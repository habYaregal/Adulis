import { Router } from "express";
import { postTruck, getTruck } from "../controllers/truck.js";

const router= Router();

router.post('/postTruck',postTruck);
router.get('/getTruck',getTruck);

export const truckRoutes = router