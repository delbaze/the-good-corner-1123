import express from "express";
import adsRouter from "./routes/ads.routes";


const app = express();
app.use(express.json()); //middleware

app.use("/ads", adsRouter)

app.listen(4000, () => {
  console.log("Le serveur est lancé sur le port 4000");
});
