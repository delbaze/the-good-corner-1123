import Ad from "../entities/Ad.entity";
import datasource from "../lib/datasource";
import { AdCreateInput } from "../types/ads";
import { Like, Repository } from "typeorm";
import CategoryServices from "./categories.services";
import TagsServices from "./tags.services";
import Tag from "../entities/Tag.entity";

class AdServices {
  db: Repository<Ad>;
  dbTag: Repository<Tag>;
  constructor() {
    this.db = datasource.getRepository(Ad);
    this.dbTag = datasource.getRepository(Tag);
  }
  async create(data: AdCreateInput) {
    const category = await new CategoryServices().find(data.category.id);
    let tags: Tag[] = [];
    if (data?.tags?.length) {
      tags = await new TagsServices().list(data.tags);
    }
    const newAd = this.db.create({ ...data, category, tags }); //newAd attend une categorie. Si la catégorie n'est pas trouvée, le find juste au dessus lèvera une erreur, sinon nous arriverons ici
     return await this.db.save(newAd);
    // return await this.list();
  }
  async list(search?: string) {
    return await this.db.find({
      relations: { category: true, tags: true }, //permet de récupérer la jointure faite entre ad et category et entre ad et tags
      where: search
        ? [
            //si le where est un tableau on a un WHERE OR sinon, si vous mettez un objet, c'est un WHERE AND
            { title: Like(`%${search}%`) },
            { tags: { name: Like(`%${search}%`) } },
          ]
        : undefined,
    });
  }

  async find(id: number) {
    const ad = await this.db.findOne({
      where: { id },
      relations: { tags: true, category: true },
    });
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

  async update(
    id: number,
    { tags, ...data }: Partial<AdCreateInput>
  ) {
    const ad = await this.find(id);
    const newInfos = this.db.merge(ad, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    let listTags: Tag[] = [];
    if (tags?.length) {
      listTags = await new TagsServices().list(tags);
    }

    const result = listTags.reduce((acc, item) => {
      return acc.includes(item) ? acc : [...acc, item];
    }, [] as Tag[]);
    newInfos.tags = result;
    return await this.db.save(newInfos);
  }
}

export default AdServices;
