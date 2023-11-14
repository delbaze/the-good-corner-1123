import { Request, Response, Router } from "express";

interface Ad {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
}
const ads: Ad[] = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

//! rajouter (plus tard) la validation de ce qui est reçu dans le body

const router = Router();
router.post("/ads/create", function (req: Request, res: Response) {
  const data: Ad = req.body;
  //ES5
  const isAlreadyInData: boolean = ads.some((ad) => ad.id === data.id);
  if (isAlreadyInData) {
    throw new Error("Cette annonce existe déjà");
  }
  ads.push(data); //on ajoute les données reçues dans le tableau du haut
  // //ES6
  // ads = [...ads, data]
  res.send(ads);
  //vérifier qu'il n'existe pas déjà
});

router.get("/list", function (req, res) {
  res.send(ads);
});
router.get("/find/:id", function (req, res) {
  // res.send(ads);
  const id = +req.params.id;
  const ad = ads.find((item) => item.id === id);
  if (!ad) {
    // throw new Error("L'annonce n'existe pas");
    return res
      .status(404)
      .send({ message: "L'annonce n'existe pas", success: false });
  }
  res.send(ad);
});

router.patch("/update/:id", function (req, res) {
  // /delete?id=123456789&toto=tata&maVariable=12345 => variable de requête (query variable)
  //req.params.id
  const id = +req.params.id;
  const data: Ad = req.body;

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
  } else {
    ads[updateIndex] = { ...ads[updateIndex], ...data };

    res.send(ads[updateIndex]);
  }
});
router.delete("/delete/:id", (req, res) => {
  const id = +req.params.id;
  //1ere méthode
  // if (ads.some((ad) => ad.id !== id)) {
  //   // throw new Error("L'annonce n'existe pas");
  //   return res
  //     .status(404)
  //     .send({ message: "L'annonce n'existe pas", success: false });
  // }
  // const filteredAds = ads.filter((ad) => ad.id !== id);
  // res.send(filteredAds);

  //2eme méthode avec l'index
  const index = ads.findIndex((ad) => ad.id === id);
  if (index === -1) {
    return res.status(404).send("not found");
  }
  ads.splice(index, 1);
  res.send(ads);
});


export default router;