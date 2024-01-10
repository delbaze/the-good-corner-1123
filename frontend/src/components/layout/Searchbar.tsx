import styles from "@/styles/Searchbar.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SyntheticEvent } from "react";
import Link from "next/link";
import { useListAdsWithFilterLazyQuery } from "@/types/graphql";
function SearchBar() {

  const [getListAds, {data, loading}] = useListAdsWithFilterLazyQuery()


  const handleSearch = (e: SyntheticEvent<Element, Event>, value: string) => {
    getListAds({variables: {search: value}})
  };
  return (
    <Autocomplete
      id="grouped-demo"
      loading={loading}
      options={data?.listAds ?? []}
      groupBy={(option) => option.category.name}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Recherche" />}
      onInputChange={handleSearch}
      renderOption={(props, option, state) => (
        <li {...props} key={option.id}>
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
