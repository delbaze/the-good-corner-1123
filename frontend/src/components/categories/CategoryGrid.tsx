import {  ListCategoriesQuery } from "@/types/graphql";
import Link from "next/link";

function CategoryGrid({ categories }: { categories: ListCategoriesQuery["listCategories"] }) {
  return (
    <ul>
      {categories.map((c) => (
        <li key={c.id}>
          <Link href={`/categories/view/${c.id}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  );
}
export default CategoryGrid;
