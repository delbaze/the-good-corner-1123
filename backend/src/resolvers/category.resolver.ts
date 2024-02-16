import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Category, {
  CategoryCreateInput,
  CategoryWithAdsCounted,
} from "../entities/Category.entity";
import CategoryServices from "../services/categories.services";

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async listCategories() {
    const categories: Category[] = await new CategoryServices().list();
    return categories;
  }

  @Query(() => CategoryWithAdsCounted)
  async findCategory(
    @Arg("id") id: string,
    @Arg("limit", { nullable: true }) limit?: number,
    @Arg("skip", { nullable: true }) skip?: number
  ) {
    const categoryWithAdsAndCounter = await new CategoryServices().find(
      +id,
      limit,
      skip
    );
    return categoryWithAdsAndCounter;
  }
  @Mutation(() => Category)
  async createCategory(@Arg("infos") infos: CategoryCreateInput) {
    const newCategory = await new CategoryServices().create({ ...infos });
    return newCategory;
  }
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("infos") infos: CategoryCreateInput
  ) {
    const newCategory = await new CategoryServices().update(+id, infos);
    return newCategory;
  }

  @Mutation(() => [Category])
  async deleteCategory(@Arg("id") id: string) {
    const categories: Category[] = await new CategoryServices().delete(+id);
    return categories;
  }
}
