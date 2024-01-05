import { Query, Resolver } from "type-graphql";
import Category from "../entities/Category.entity";
import CategoryServices from "../services/categories.services";
import { CategoryCreateInput } from "../types/categories";

@Resolver()
export default class CategoryResolver {
    @Query(() => [Category])
    async listCategories() {
      const categories: Category[] = await new CategoryServices().list();
      console.log("CATEGORIES", categories);
      return categories;
    }

}