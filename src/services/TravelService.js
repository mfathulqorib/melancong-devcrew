const axios = require("axios");

// get cookie from browser
// const cookieStore = cookies();
// const token = cookieStore.get("token").value; <- belum ada UI login
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExNjYyODRhLTNlNjUtNGI0MS05ZWIzLWFmMDJlMjIyMDVkMyIsInVzZXJuYW1lIjoibWFya28iLCJuYW1lIjoibWFya28gZWZlbmRpIiwiYmlvIjoic29sbyB0cmF2ZWxsZXIiLCJlbWFpbCI6ImRva3RlcmZhcm1hMDAxQGdtYWlsLmNvbSIsImF2YXRhciI6IiIsInJvbGVJZCI6ImRldmNyM3ctNDUtdTUzciIsImlhdCI6MTcwMzgzOTUwMCwiZXhwIjoxNzA0NDQ0MzAwfQ.jdoOLTQZvPsQ_aW0qL7hpWj5eVKbzhPgPePc-_BAfqc";

export const travelService = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export async function getAllPosts() {
  try {
    const response = await travelService.get("/posts");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
