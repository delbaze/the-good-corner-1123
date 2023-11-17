import Ad from '../entities/Ad.entity';
import AdServices from '../services/ads.services';
import { AdCreateInput } from '../types/ads';
import { Request, Response, Router } from 'express';

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
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const ads: Ad[] = await new AdServices().list();
  res.send(ads);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ad: Ad = await new AdServices().find(id);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Ad> = req.body;
  try {
    const ad: Ad = await new AdServices().update(id, data);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ads: Ad[] = await new AdServices().delete(id);
    res.send(ads);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
