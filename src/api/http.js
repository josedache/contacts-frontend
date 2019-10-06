import axios from "axios";

const Http = axios.create({
  baseURL: getDomain(),
});

function getDomain() {
  if (process.env.NODE_ENV === "production") {
    return "https://obscure-garden-12083.herokuapp.com/";
  }
  return "http://localhost:8080";
}

export default Http
