import { ads } from "../data";
import { Ad, AdCreateInput } from "../types/ads";
import sqlite3 from "sqlite3";

// const db = new sqlite3.Database("../../thegoodcorner.sqlite");
class AdServices {
  db: sqlite3.Database;
  constructor() {
    this.db = new sqlite3.Database("thegoodcorner.sqlite");
  }
  async create(data: AdCreateInput) {
    // ON UTILISERA LE INSERT INTO à la place du push

    const requete = this.db.prepare(
      "INSERT INTO ads (title, description, owner, price, picture, location) VALUES (?, ?, ?, ?, ?, ?)"
    );
    requete.run([
      data.title,
      data.description,
      data.owner,
      data.price,
      data.picture,
      data.location,
    ]);

    return await this.list();
  }
  list() {
    return new Promise<Ad[]>((resolve, reject) => {
      this.db.all("SELECT * FROM ads", (err, rows) => {
        if (err) {
          reject(err.message);
        }
        resolve(rows as Ad[]);
      });
    });
  }
  // checkIfExist(id: number): void {
  //   const isAlreadyInData: boolean = ads.some((ad) => ad.id === id);
  //   if (isAlreadyInData) {
  //     throw new Error("Cette annonce existe déjà!");
  //   }
  // }
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
