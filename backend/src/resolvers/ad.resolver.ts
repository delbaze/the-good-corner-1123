import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Ad, { AdCreateInput, AdUpdateInput } from "../entities/Ad.entity";
import AdServices from "../services/ads.services";

@Resolver()
export default class AdResolver {
  @Query(() => [Ad])
  async listAds(@Arg("search", { nullable: true }) search: string) {
    const ads: Ad[] = await new AdServices().list(
      search as string | undefined
    );
    return ads;
  }
  @Query(() => Ad)
  async findAd(@Arg("id") id: string) {
    const ad: Ad = await new AdServices().find(+id);
    return ad;
  }

  @Mutation(() => Ad)
  async createAd(@Arg("infos") infos: AdCreateInput) {
    const result: Ad = await new AdServices().create(infos);
    return result;
  }

  @Mutation(() => Ad)
  async updateAd(@Arg("id") id: string, @Arg("infos") infos: AdUpdateInput) {
    const ad: Ad = await new AdServices().update(+id, infos);
    return ad;
  }

  @Mutation(() => [Ad])
  async deleteAd(@Arg("id") id: string) {
    const ads: Ad[] = await new AdServices().delete(+id);
    return ads;
  }
}
