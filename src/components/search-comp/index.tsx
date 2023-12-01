import { Dispatch, useState } from "react";
import { SearchBar } from "../search-bar";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Box, Stack, useTheme } from "@mui/material";
import { SearchResult } from "../search-result";
import { useOutsideClick } from "../../hooks/use-click";

export type SearchProps = {
  user: any;
  setUser: Dispatch<any>;
};
export const Search = ({ user, setUser }: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const theme = useTheme();

  const handleSearch = async (event: any) => {
    if (searchValue && searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }
    event.preventDefault();
    setSearchValue(event.target.value);
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", searchValue),
      where("displayName", "<=", searchValue + "\uf8ff")
    );
    const docRefs = await getDocs(q);
    const res: any[] = [];
    docRefs.forEach((person) => {
      res.push(person.data());
    });
    setSearchResults(res);
  };
  const ref = useOutsideClick(() => {
    setSearchResults([]);
    console.log("Clicked outside of MyComponent");
  });
  return (
    <Stack
      ref={ref}
      position={"relative"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SearchBar
          searchResults={searchResults}
          user={user}
          setUser={setUser}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
        <Stack
          display={searchResults.length === 0 ? "none" : "flex"}
          border={`1px solid ${theme.palette.secondary.dark}`}
          borderRadius={"4px"}
          width={"100%"}
          bgcolor={theme.palette.primary.main}
          position={"absolute"}
          zIndex={100}
          top={"100%"}
          gap={1.5}
          sx={{
            boxShadow: `0px 7px 7px 0px ${theme.palette.secondary.contrastText}`,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: { xs: "1px", md: "4px" },
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          {searchResults.map((result) => (
            <SearchResult
              key={result.id}
              id={result.id}
              displayName={result.displayName}
              avatar={result.avatar}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
