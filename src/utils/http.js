import axios from "axios";

export const BASE_ENDPOINT = "/api";

const Http = axios.create({
  baseURL: getDomain().concat(BASE_ENDPOINT),
});

function getDomain() {
  if (process.env.NODE_ENV === "production") {
    return "https://obscure-garden-12083.herokuapp.com";
  }
  return "http://localhost:8080";
}

export default Http;
