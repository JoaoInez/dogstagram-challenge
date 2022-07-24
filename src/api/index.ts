import ky from "ky";

const api = ky.create({
  prefixUrl: "https://api.thedogapi.com/v1",
  headers: { "x-api-key": process.env.REACT_APP_API_KEY },
});

export default api;
