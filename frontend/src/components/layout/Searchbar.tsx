import styles from "@/styles/Searchbar.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SyntheticEvent, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import { Ad } from "@/types/ad";
function SearchBar() {
  // return <input placeholder="Rechercher" className={styles.inputSearch} />;
  // const demo = [
  //   {
  //     name: "toto",
  //     id: 123,
  //     category: "Chaussure",
  //   },
  //   {
  //     name: "tata",
  //     id: 456,
  //     category: "Voiture",
  //   },
  // ];
  const [ads, setAds] = useState<Ad[]>([]);
  const handleChange = (e: SyntheticEvent<Element, Event>) => {
    console.log("Je dois rediriger vers l'annonce ici");
  };

  const handleSearch = (e: SyntheticEvent<Element, Event>, value: string) => {
    console.log(value);
    console.log("Faire le requête à partir de la valeur de l'input"); //http://localhost:4000/ads/list?search=marecherche&categoryid=2
    axiosInstance.get<Ad[]>(`/ads/list?search=${value}`).then((response) => {
      console.log(response);
      setAds(response.data);
    });
  };
  return (
    <Autocomplete
      id="grouped-demo"
      options={ads}
      groupBy={(option) => option.category.name}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Recherche" />}
      onChange={handleChange}
      onInputChange={handleSearch}
      renderOption={(props, option, state) => (
        <li {...props}>
          <Link href={`/ads/view/${option.id}`} >
            <p style={{ paddingLeft: "2rem" }} key={state.index}>
              {option.title}
            </p>
          </Link>
        </li>
      )}
      // renderGroup={(params) => (
      //   <li key={params.key}>
      //     <Link href="tata">{params.group}</Link>
      //     <p>{params.children}</p>
      //   </li>
      // )}
    />
  );
}

export default SearchBar;
