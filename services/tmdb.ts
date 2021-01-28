import axios from "axios";

const tmdb = axios.create({
  baseURL: ""
});

export default tmdb;