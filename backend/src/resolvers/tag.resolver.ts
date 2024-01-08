import { Arg, Mutation, Query } from "type-graphql";
import Tag, { TagCreateInput, TagUpdateInput } from "../entities/Tag.entity";
import TagsServices from "../services/tags.services";

export default class TagResolver {
  @Query(() => [Tag])
  async listTags() {
    const tags: Tag[] = await new TagsServices().list();
    return tags;
  }

  @Query(() => Tag)
  async findTag(@Arg("id") id: string) {
    const tag: Tag = await new TagsServices().find(+id);
    return tag;
  }

  @Mutation(() => [Tag])
  async createTag(@Arg("infos") infos: TagCreateInput) {
    const result: Tag[] = await new TagsServices().create({
      name: infos.name,
    });
    return result;
  }
  @Mutation(() => Tag)
  async updateTag(@Arg("id") id: string, @Arg("infos") infos: TagUpdateInput) {
    const tag: Tag = await new TagsServices().update(+id, infos);
    return tag;
  }

  @Mutation(() => [Tag])
  async deleteTag(@Arg("id") id: string) {
    const tags: Tag[] = await new TagsServices().delete(+id);
    return tags;
  }
}
