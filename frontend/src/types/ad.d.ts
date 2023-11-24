import Category from "./category";
export interface Ad {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: number;
  slug: string
  category: Category;
}
