import { Request, Response, Router } from "express";
import { categories } from "../data";
import { Category } from "../types/categories";
const router = Router();

/**======================
 *?    création des routes ici
 *========================**/

router.post("/create", function (req: Request, res: Response) {
  const { id, name }: Category = req.body;

  const isAlreadyInData: boolean = categories.some((c) => c.id === id);
  if (isAlreadyInData) {
    throw new Error("Cette catégorie existe déjà");
  }
  categories.push({ id, name });
  res.send(categories);
});
router.get("/list", function (req: Request, res: Response) {
  res.send(categories);
});
router.get("/find/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res
      .status(404)
      .send({ message: "La catégorie n'existe pas", success: false });
  }
  res.send(category);
});
router.patch("/update/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Category = req.body;
    //! prévoir que on envoi pas tout le data, mais que on envoi que les clés qui ont été renseignées
 

  if (!data) {
    return res
      .status(400)
      .send({ message: "Vérifiez vos informations", success: false });
  }
  const updateIndex = categories.findIndex((c) => c.id === id);
  if (updateIndex === -1) {
    return res
      .status(404)
      .send({ message: "La catégorie n'existe pas", success: false });
  }

  categories[updateIndex] = { ...categories[updateIndex], ...data };

  res.send(categories[updateIndex]);
});
router.delete("/delete/:id", function (req: Request, res: Response) {
  const id = +req.params.id;
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return res
      .status(404)
      .send({ message: "La catégorie n'existe pas", success: false });
  }
  categories.splice(index, 1);

  res.send(categories);
});

export default router;
