import {
  Box,
  Button,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
export const SearchBar = () => {
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
      />
      <Button sx={{ backgroundColor: "#00A3FF" }}>
        <AddIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.contrastText }}
        />
      </Button>
    </Box>
  );
};
