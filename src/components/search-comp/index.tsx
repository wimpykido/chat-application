import { Dispatch, useEffect, useState } from "react";
import { SearchBar } from "../search-bar";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Stack } from "@mui/material";
import { SearchResult } from "../search-result";

export type SearchProps = {
  user: any;
  setUser: Dispatch<any>;
};
export const Search = ({ user, setUser }: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([
    { displayName: "eliso", avatar: null },
  ]);

  const handleSearch = async (): Promise<void> => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchValue)
    );
    try {
      const querySnapshot = await getDocs(q);
      const results: any = [];
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        results.push(doc.data());
        console.log(doc.data());
      });
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <Stack
      position={"relative"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SearchBar
        searchResults={searchResults}
        user={user}
        setUser={setUser}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={() => handleSearch()}
      />
      {searchResults.map((result) => (
        <SearchResult
          key={result.id}
          id={result.id}
          displayName={result.displayName}
          avatar={result.avatar}
        />
      ))}
    </Stack>
  );
};
