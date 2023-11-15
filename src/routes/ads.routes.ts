import { Router, Request, Response } from "express";
import { Ad } from "../types/ads";
import { ads } from "../data";
import AdServices from "../services/ads.services";
const router = Router();

router.post("/create", function (req: Request, res: Response) {
  const {
    id,
    description,
    location,
    createdAt,
    owner,
    picture,
    price,
    title,
  }: Ad = req.body;

  try {
    new AdServices().checkIfExist(id);
    const result: Ad[] = new AdServices().create({
      id,
      description,
      location,
      createdAt,
      owner,
      picture,
      price,
      title,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", function (req: Request, res: Response) {
  const result = new AdServices().list();
  res.send(result);
});
router.get("/find/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const ad = ads.find((item) => item.id === id);
  if (!ad) {
    return res
      .status(404)
      .send({ message: "L'annonce n'existe pas", success: false });
  }
  res.send(ad);
});

router.patch("/update/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Ad> = req.body;
  //! prévoir que on envoi pas tout le data, mais que on envoi que les clés qui ont été renseignées
  if (!data) {
    return res
      .status(400)
      .send({ message: "Vérifiez vos informations", success: false });
  }
  const updateIndex = ads.findIndex((item) => item.id === id);
  if (updateIndex === -1) {
    return res
      .status(404)
      .send({ message: "L'annonce n'existe pas", success: false });
  }
  ads[updateIndex] = { ...ads[updateIndex], ...data };
  res.send(ads[updateIndex]);
});
router.delete("/delete/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const index = ads.findIndex((ad) => ad.id === id);
  if (index === -1) {
    return res
      .status(404)
      .send({ message: "L'annonce n'existe pas", success: false });
  }
  ads.splice(index, 1);
  res.send(ads);
});

export default router;
