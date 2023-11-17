import Category from '../entities/Category.entity';
import CategoryServices from '../services/categories.services';
import { CategoryCreateInput } from '../types/categories';
import { Request, Response, Router } from 'express';

const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  try {
    const { name }: CategoryCreateInput = req.body;
    const result: Category[] = await new CategoryServices().create({
      name,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.get("/list", async function (req: Request, res: Response) {
  const categories: Category[] = await new CategoryServices().list();
  res.send(categories);
});
router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const category: Category = await new CategoryServices().find(id);
    res.send(category);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<Category> = req.body;
  try {
    const category: Category = await new CategoryServices().update(id, data);
    res.send(category);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const categories: Category[] = await new CategoryServices().delete(id);
    res.send(categories);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
