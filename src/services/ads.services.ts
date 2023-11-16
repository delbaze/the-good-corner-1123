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
      this.db.all<Ad>("SELECT * FROM ads", (err, rows) => {
        if (err) {
          reject(err.message);
        }
        resolve(rows);
      });
    });
  }

  find(id: number) {
    return new Promise<Ad>((resolve, reject) => {
      this.db.get<Ad>("SELECT * FROM ads WHERE id = ?", [id], (err, row) => {
        if (!row) {
          reject("L'annonce n'existe pas");
        }
        resolve(row);
      });
    });
  }

  delete(id: number) {
    return new Promise<Ad[]>(async (resolve, reject) => {
      try {
        await this.find(id);
        //Premiere méthode :
        // const requete = this.db.prepare("DELETE FROM ads WHERE id = ?");
        // requete.run([id]);

        //Deuxième méthode :
        this.db.run("DELETE FROM ads WHERE id = ?", [id], async (err) => {
          if (err) {
            reject("Il y a eu un problème lors de la suppresion");
          }
          const ads = await this.list();
          resolve(ads);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  update(id: number, data: Partial<Ad>) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject("Vérifiez vos informations");
        }
        await this.find(id);

        // this.db.run("UPDATE ads SET id = ? WHERE id = ?")
        //! à revoir  pour finir le run sql
        

      } catch (err) {
        reject(err);
      }
    });
    // if (!data) {
    //   throw new Error("Vérifiez vos informations");
    // }
    // const updateIndex = ads.findIndex((item) => item.id === id);
    // if (updateIndex === -1) {
    //   throw new Error("L'annonce n'existe pas");
    // }
    // ads[updateIndex] = { ...ads[updateIndex], ...data };
    // return ads[updateIndex];
  }
}

export default AdServices;
