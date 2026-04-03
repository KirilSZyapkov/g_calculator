import { Router } from "express";
import { runLogisticsAgent } from "../services/logisticsAgent";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;

    // const result = await runLogisticsAgent(message, history);
    const result = "";

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI processing failed" });
  }
})

export default router;