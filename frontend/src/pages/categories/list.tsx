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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [actualId, setActualId] = useState<number>();

  const resetForm = () => {
    setEditMode(false);
    setActualId(undefined);
    setNewCategoryName("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //est ce qu'on est dans l'édition ou dans l'ajout?????
    e.preventDefault(); //court circuiter le comportement par défaut du formulaire (autrement dit de ne pas jouer l'action du form)
    if (editMode) {
      setCategories(
        categories.map((c) => {
          if (c.id === actualId) {
            return {
              ...c,
              name: newCategoryName,
            };
          }
          return c;
        })
      );
      resetForm();
    } else {
      const newId = categories[categories.length - 1]?.id + 1;
      setCategories([...categories, { id: newId, name: newCategoryName }]);
      setNewCategoryName("");
    }
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
      if (actualId && +id === actualId) {
        resetForm();
      } else {
        setEditMode(true);
        setActualId(+id);
        let category = categories.find((c) => c.id == +id);
        if (category) {
          setNewCategoryName(category?.name);
        }
      }
    }
  };
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button
              data-id={category.id}
              onClick={handleDelete}
              disabled={editMode}
            >
              {/* <button data-id={category.id} onClick={handleDelete} disabled={editMode && category.id === actualId}> */}
              Supprimer
            </button>
            {/* <button onClick={() => handleDelete(category.id)}>Supprimer</button> */}
            <button data-id={category.id} onClick={handleEdit}>
              {category.id === actualId ? "Annuler" : "Editer"}
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
        <button>{editMode ? "Editer" : "Créer"}</button>
      </form>
    </div>
  );
}

export default ListCategories;
