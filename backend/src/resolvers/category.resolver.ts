import Category from "../entities/Category.entity";
import CategoryServices from "../services/categories.services";
import { CategoryCreateInput } from "../types/categories";

export default {
  Query: {
    listCategories: async () => {
      const categories: Category[] = await new CategoryServices().list();
      console.log("CATEGORIES", categories);
      return categories;
    },
    findCategory: async (_: any, { id }: { id: string }) => {
      const category: Category = await new CategoryServices().find(+id);
      return category;
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      { infos }: { infos: CategoryCreateInput }
    ) => {
      const result: Category = await new CategoryServices().create(infos);
      return result;
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      const categories: Category[] = await new CategoryServices().delete(+id);
      return categories;
    },
  },
};
