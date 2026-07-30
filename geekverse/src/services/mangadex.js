import axios from "axios";

const mangadex = axios.create({
  baseURL: "https://api.mangadex.org",
});

export default mangadex;