import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "./../utils/Constants";
import { SearchBar } from "./index";

function Navbar() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
    </Stack>
  );
}

export default Navbar;
