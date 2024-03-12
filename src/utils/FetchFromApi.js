import axios from "axios";
const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  url: BASE_URL,
  params: {
    part: "snippet,id",
    videoId: "M7FIvfx5J10",
    order: "date",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_YOUTUBE_TOKEN,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const FetchFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

export default FetchFromApi;
