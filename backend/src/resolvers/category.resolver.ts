import Category from "../entities/Category.entity";
import CategoryServices from "../services/categories.services";

export default {
    Query: {
      listCategories: async () => {
        const categories: Category[] = await new CategoryServices().list();
        console.log("CATEGORIES", categories);
        return categories;
      },
      findCategory: async (_: any, { id }: {id: string}) => {
        const category: Category = await new CategoryServices().find(+id);
        return category
      }
    },
  };
  