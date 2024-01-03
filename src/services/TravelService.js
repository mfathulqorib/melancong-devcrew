import { API_URL, TOKEN } from "@/utils/ApiUrl";

const axios = require("axios");

// get cookie from browser
// const cookieStore = cookies();
// const token = cookieStore.get("token").value; <- belum ada UI login

export const travelService = axios.create({
  baseURL: API_URL,
});
