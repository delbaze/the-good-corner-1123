import { Ad } from "./ad";

export interface Category {
  id: number;
  name: string;
  ads: Ad[]
}
