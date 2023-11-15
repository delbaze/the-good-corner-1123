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
  find(id: number) {}
}

export default AdServices;
