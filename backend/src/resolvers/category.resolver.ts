import Category from "../entities/Category.entity";
import CategoryServices from "../services/categories.services";

export default {
    Query: {
      listCategories: async () => {
        const categories: Category[] = await new CategoryServices().list();
        console.log("CATEGORIES", categories);
        return categories;
      }
    },
  };
  