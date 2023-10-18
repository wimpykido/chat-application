import {
  Box,
  Button,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState<any>();


  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchValue)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();

  return (
    <Box display={"flex"} justifyContent={"space-between"} width={"90%"}>
      <TextField
        placeholder="search people"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        aria-label="Start a private chat"
        sx={{ backgroundColor: "#00A3FF" }}
      >
        <AddIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.contrastText }}
        />
      </Button>
    </Box>
  );
};
