import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

function ListCategories() {
  const [state, setState] = useState(false);
  // async function marequete() {
  //   const response = await axiosInstance.get("/categories/list");
  //   console.log("%c⧭", "color: #1d5673", response);
  // }
  useEffect(() => {
    // marequete();
    axiosInstance.get("/categories/list").then((response) => {
      console.log(response);
    });
  }, []);

  // useEffect(() => {
  //   console.log("STATE DEPUIS USE EFFECT", state);
  // }, [state]);
  const handleClick = () => {
    setState(!state);
    console.log("STATE DEPUIS LE CLICK", state);
  };
  return (
    <>
      <h1>Liste des catégories : </h1>
      <button onClick={handleClick}>Click</button>
    </>
  );
}

export default ListCategories;
