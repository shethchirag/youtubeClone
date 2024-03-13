import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import FetchFromApi from "../utils/FetchFromApi";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";

function VideoDetails() {
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState(null);
  console.log(relatedVideo);
  const { id } = useParams();

  useEffect(() => {
    FetchFromApi(`videos?part=contentDetails,snippet,statistics&id=${id}`).then(
      (data) => setVideoDetails(data?.items[0])
    );
    FetchFromApi(
      `search?part=id,snippet&type=video&relatedToVideoId=${id}`
    ).then((data) => setRelatedVideo(data?.items));
  }, [id]);
  // Render null if videoDetails is null or undefined
  if (!videoDetails) {
    return null;
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetails;
  console.log(title);
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
        >
          <Videos direction="column" videos={relatedVideo} />
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetails;
