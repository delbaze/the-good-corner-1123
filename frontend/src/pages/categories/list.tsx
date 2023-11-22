import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Category } from "@/types/category";
import CategoryGrid from "@/components/CategoryGrid";

function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axiosInstance.get("/categories/list").then((response) => {
      setCategories(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <>
      <h1>Liste des catégories : </h1>
      {/* {categories.length && <CategoryGrid categories={categories} />} */}
      {categories.length ? (
        <CategoryGrid categories={categories} />
      ) : (
        <div>Aucune catégorie</div>
      )}
    </>
  );
}

export default ListCategories;
