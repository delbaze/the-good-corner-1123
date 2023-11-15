import { ads } from "../data";
import { Ad } from "../types/ads";

class AdServices {
  // db: Repository<Ad>
  // constructor(){
  //     this.db = datasource.getRepository(Ad)
  // }
  create(data: Ad) {
    ads.push(data);
    return ads;
  }
  list() {
    return ads;
  }
  checkIfExist(id: number): void {
    const isAlreadyInData: boolean = ads.some((ad) => ad.id === id);
    if (isAlreadyInData) {
      throw new Error("Cette annonce existe déjà!");
    }
  }
  find(id: number) {
    const ad = ads.find((item) => item.id === id);
    if (!ad) {
      throw new Error("L'annonce n'existe pas");
    }
    return ad;
  }

  delete(id: number) {
    const index = ads.findIndex((ad) => ad.id === id);
    if (index === -1) {
      throw new Error("L'annonce n'existe pas");
    }
    ads.splice(index, 1);
    return ads;
  }
  update(id: number, data: Partial<Ad>) {
    if (!data) {
      throw new Error("Vérifiez vos informations");
    }
    const updateIndex = ads.findIndex((item) => item.id === id);
    if (updateIndex === -1) {
      throw new Error("L'annonce n'existe pas");
    }
    ads[updateIndex] = { ...ads[updateIndex], ...data };
    return ads[updateIndex];
  }
}

export default AdServices;
