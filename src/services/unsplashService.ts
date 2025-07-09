// src/services/unsplashService.ts

import axios from "axios";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const getImages = async (query: string = "nature") => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      per_page: 12,
      client_id: accessKey,
    },
  });
  
  console.log("RESULTADO DA API:", response.data.results);

  return response.data.results;
};
