import { API_URL } from "@/utils/ApiUrl";

const axios = require("axios");

export const travelService = axios.create({
  baseURL: API_URL,
});
