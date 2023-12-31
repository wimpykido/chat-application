import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";
import { SearchProps } from "../search-comp";

type SearchBarProps = SearchProps & {
  searchResults: any[];
  searchValue: string | null;
  setSearchValue: Dispatch<SetStateAction<string | null>>;
  handleSearch: (event: any) => Promise<void>;
};

export const SearchBar = ({
  user,
  setUser,
  searchValue,
  setSearchValue,
  handleSearch,
  searchResults,
}: SearchBarProps) => {
  return (
    <Box marginTop={2} display={"flex"} justifyContent={"center"} width={"90%"}>
      <TextField
        fullWidth
        placeholder="search people"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e);
        }}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
      />
    </Box>
  );
};
