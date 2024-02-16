import Ad from "../entities/Ad.entity";
import Category, { CategoryCreateInput } from "../entities/Category.entity";
import datasource from "../lib/datasource";
import { Repository } from "typeorm";

class CategoryServices {
  db: Repository<Category>;
  dbAds: Repository<Ad>;
  constructor() {
    this.db = datasource.getRepository(Category);
    this.dbAds = datasource.getRepository(Ad);
  }
  async create(data: Partial<CategoryCreateInput>) {
    const newCategory = this.db.create(data);
    newCategory.ads = [];
    return await this.db.save(newCategory);
  }
  async list() {
    return await this.db.find({ relations: { ads: true } });
  }

  async find(id: number) {
    const category = await this.db.findOneBy({ id });
    if (!category) {
      throw new Error("La catégorie n'existe pas");
    }
    const ads = await this.dbAds.findAndCountBy({
      category: { id: category.id },
    });
    if (!category) {
      throw new Error("La catégorie n'existe pas");
    }

    return { category, ads: ads[0], count: ads[1] };
  }

  async delete(id: number) {
    const category = (await this.find(id)).category;
    await this.db.remove(category);
    return await this.list();
  }

  async update(id: number, data: Partial<Category>) {
    const category = (await this.find(id)).category;
    const newInfos = this.db.merge(category, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.db.save(newInfos);
  }
}

export default CategoryServices;
