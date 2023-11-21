import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "ma catégorie 1",
  },
  {
    id: 2,
    name: "ma catégorie 2",
  },
  {
    id: 3,
    name: "ma catégorie 3",
  },
];

function ItemList({ name }: { name: string }) {
  return <li>{name}</li>;
}

function ListCategories() {
    
    const [state, setState] = useState("toto")
  return (
    <div>
      <ul>
        {categories.map((category) => (
          //   <li key={category.id}>{category.name}</li>
          <ItemList key={category.id} name={category.name} />
        ))}
      </ul>
    </div>
  );
}

export default ListCategories;
