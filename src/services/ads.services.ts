import Ad from '../entities/Ad.entity';
import datasource from '../lib/datasource';
import { AdCreateInput } from '../types/ads';
import { Repository } from 'typeorm';

class AdServices {
  db: Repository<Ad>;
  constructor() {
    this.db = datasource.getRepository(Ad);
  }
  async create(data: AdCreateInput) {
    const newAd = this.db.create(data);
    await this.db.save(newAd);
    return await this.list();
  }
  async list() {
    return await this.db.find();
  }

  async find(id: number) {
    const ad = await this.db.findOneBy({ id });
    if (!ad) {
      throw new Error("L'annonce n'existe pas");
    }
    return ad;
  }

  async delete(id: number) {
    const ad = await this.find(id);
    await this.db.remove(ad);
    return await this.list();
  }

  async update(id: number, data: Partial<Ad>) {
    const ad = await this.find(id);
    const newInfos = this.db.merge(ad, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.db.save(newInfos);
  }
}

export default AdServices;
