import { Box, Typography } from "@mui/material";

import { Videos } from "./index.js";
import FetchFromApi from "../utils/FetchFromApi.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SearchFeed() {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    FetchFromApi(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Result for:{" "}
        <span style={{ color: "#f31503" }}>{searchTerm}</span> videos
        {/* <span style={{ color: "#f31503" }}>Videos</span> */}
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
}

export default SearchFeed;
