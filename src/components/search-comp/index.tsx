import { Dispatch, useCallback, useEffect, useState } from "react";
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
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (): Promise<void> => {
    if (searchValue && searchValue.length > 0) {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", searchValue),
        where("displayName", "<=", searchValue + "\uf8ff")
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
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchValue, setUser]);

  return (
    <Stack
      position={"relative"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SearchBar
        setSearchResults={setSearchResults}
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
