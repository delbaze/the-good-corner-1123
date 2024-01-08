import datasource from "../lib/datasource";
import Tag, { TagCreateInput } from "../entities/Tag.entity";
import { In, Repository } from "typeorm";

class TagsServices {
  db: Repository<Tag>;
  constructor() {
    this.db = datasource.getRepository(Tag);
  }
  async create(data: TagCreateInput) {
    const newTag = this.db.create(data);
    await this.db.save(newTag);
    return await this.list();
  }
  async list(tagIds?: string[]) {
    return await this.db.find({
      where: {
        id: tagIds && tagIds.length > 0 ? In(tagIds.map((t) => +t)) : undefined,
      },
    });
  }

  async find(id: number) {
    const tag = await this.db.findOne({ where: { id } });
    if (!tag) {
      throw new Error("Le tag n'existe pas");
    }
    return tag;
  }

  async delete(id: number) {
    const tag = await this.find(id);
    await this.db.remove(tag);
    return await this.list();
  }
  async update(id: number, data: Partial<Tag>) {
    const tag = await this.find(id);
    const newInfos = this.db.merge(tag, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.db.save(newInfos);
  }
}

export default TagsServices;
