import Category from '../entities/Category.entity';
import datasource from '../lib/datasource';
import { CategoryCreateInput } from '../types/categories';
import { Repository } from 'typeorm';

class CategoryServices {
  db: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Category);
  }
  async create(data: CategoryCreateInput) {
    const newCategory = this.db.create(data);
    await this.db.save(newCategory);
    return await this.list();
  } 
  async list() {
    return await this.db.find();
  }

  async find(id: number) {
    const category = await this.db.findOneBy({ id });
    if (!category) {
      throw new Error("La catégorie n'existe pas");
    }
    return category;
  }

  async delete(id: number) {
    const category = await this.find(id);
    await this.db.remove(category);
    return await this.list();
  }
  
  async update(id: number, data: Partial<Category>) {
    const category = await this.find(id);
    const newInfos = this.db.merge(category, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.db.save(newInfos);
  }
}

export default CategoryServices;