import axios from "axios";

const openLibrary = axios.create({
  baseURL: "https://openlibrary.org",
});

export default openLibrary;