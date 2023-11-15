import { Router, Request, Response } from "express";
import { Ad, AdCreateInput } from "../types/ads";
import { ads } from "../data";
import AdServices from "../services/ads.services";
const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  const {

    description,
    location,
    createdAt,
    owner,
    picture,
    price,
    title,
  }: AdCreateInput = req.body;

  try {
   
    const result: Ad[] = await new AdServices().create({
      description,
      location,
      createdAt,
      owner,
      picture,
      price,
      title,
    });
    console.log("RESULT", result);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const result = await new AdServices().list();
  res.send(result);
});

router.get("/find/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ad = new AdServices().find(id);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.patch("/update/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Ad> = req.body;
  //! prévoir que on envoi pas tout le data, mais que on envoi que les clés qui ont été renseignées
  try {
    const ad = new AdServices().update(id, data);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.delete("/delete/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ads = new AdServices().delete(id);
    res.send(ads);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
