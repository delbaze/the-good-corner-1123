import Tag from '../entities/Tag.entity';
import TagsServices from '../services/tags.services';
import { Request, Response, Router } from 'express';
import { TagCreateInput } from '../types/tags';

const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  try {
    const { name }: TagCreateInput = req.body;
    const result: Tag[] = await new TagsServices().create({
      name,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.get("/list", async function (req: Request, res: Response) {
  const tags: Tag[] = await new TagsServices().list();
  res.send(tags);
});
router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const tag: Tag = await new TagsServices().find(id);
    res.send(tag);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Tag> = req.body;
  try {
    const tag: Tag = await new TagsServices().update(id, data);
    res.send(tag);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const tags: Tag[] = await new TagsServices().delete(id);
    res.send(tags);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
