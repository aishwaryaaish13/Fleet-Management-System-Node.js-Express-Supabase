import express from "express";
import { createTrip, updateTrip,getTrip, deleteTrip,endTrip} from "../controllers/trip.controller.js";
const router = express.Router();

router.post("/create", createTrip);
router.put("/update/:tripid", updateTrip);
router.get("/:tripid", getTrip);
router.delete("/delete/:tripid", deleteTrip);
router.post("/end/:tripid", endTrip);
export default router;
