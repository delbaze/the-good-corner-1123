import { useState } from "react";

interface Category {
  id: number;
  name: string;
}
function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([
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
  ]);

  const [newCategoryName, setNewCategoryName] = useState<string>("");
  //   const handleClick = () => {
  //     setCategories([...categories, { id: 4, name: "ma catégorie 4" }]);
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //court circuiter le comportement par défaut du formulaire (autrement dit de ne pas jouer l'action du form)
    const newId = categories[categories.length - 1]?.id + 1;
    setCategories([...categories, { id: newId, name: newCategoryName }]);
    setNewCategoryName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="indiquez votre nom de catégorie"
          onChange={handleChange}
          value={newCategoryName}
        />
        <button>Click</button>
      </form>
    </div>
  );
}

export default ListCategories;
