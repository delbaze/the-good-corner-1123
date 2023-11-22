import { Category } from "@/types/category";

function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <ul>
      {categories.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
}
export default CategoryGrid;
