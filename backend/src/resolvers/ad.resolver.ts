import Ad from "../entities/Ad.entity";
import AdServices from "../services/ads.services";
import { AdCreateInput } from "../types/ads";



export default {
  Mutation: {
    createAd: async (_: any, { infos }: { infos: AdCreateInput }) => {
      const result: Ad = await new AdServices().create(infos);
      return result;
    },
    deleteAd: async (_: any, { id }: { id: string }) => {
      const ads: Ad[] = await new AdServices().delete(+id);
      return ads;
    },
    updateAd: async (
      _: any,
      { id, infos }: { id: string; infos: Partial<Ad> }
    ) => {
      const ad: Ad = await new AdServices().update(
        +id,
        infos as Partial<Ad> & { tags: string[] }
      );
      return ad;
    },
  },
  Query: {
    listAds: async (_: any, { search }: { search: string }) => {
      const ads: Ad[] = await new AdServices().list(
        search as any as string | undefined
      );
      return ads;
    },
    findAd: async (_: any, { id }: { id: string }) => {
      const ad: Ad = await new AdServices().find(+id);
      return ad;
    },
  },
};
