import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import shipmentRoutes from "./routes/shipment.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/health", (req, res)=>{
  res.send("Server is healthy");
  res.status(200).json({status: "OK"});
})

app.use("/api/shipment-space", shipmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});