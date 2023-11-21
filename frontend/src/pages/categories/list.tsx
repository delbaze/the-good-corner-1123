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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //court circuiter le comportement par défaut du formulaire (autrement dit de ne pas jouer l'action du form)
    const newId = categories[categories.length - 1]?.id + 1;
    setCategories([...categories, { id: newId, name: newCategoryName }]);
    setNewCategoryName("");
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      const newArray = categories.filter((c) => c.id !== +id);
      setCategories(newArray);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      //procéder à l'édition => récupérer la catégorie dans le tableau "categories", récupérer son nom, stocker dans la variable d'état newCategoryName son nom
      let category = categories.find((c) => c.id == +id);
      if (category) {
        setNewCategoryName(category?.name);
      }
    }
  };
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button data-id={category.id} onClick={handleDelete}>
              Supprimer
            </button>
            {/* <button onClick={() => handleDelete(category.id)}>Supprimer</button> */}
            <button data-id={category.id} onClick={handleEdit}>
              Editer
            </button>
          </li>
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
