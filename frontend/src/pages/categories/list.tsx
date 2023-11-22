import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function ListCategories() {
  useEffect(() => {
    axiosInstance.get("categories/list").then((response) => {
      console.log(response);
    });
  }, []);
  return <h1>Liste des catégories : </h1>;
}

export default ListCategories;
