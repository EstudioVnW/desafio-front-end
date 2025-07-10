import { Photo } from "../../types/photo";

const ACCESS_KEY = "9a5cwvCMg03m26bMRh7D7pTiRwPX6_X5P_33bmY_Ops";

export async function fetchPhotos(query = "random"): Promise<Photo[]> {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${ACCESS_KEY}`);
  const data = await res.json();
  return data.results.map((item: any) => ({
    id: item.id,
    alt_description: item.alt_description,
    urls: {
      small: item.urls.small,
      regular: item.urls.regular || item.urls.full || item.urls.small,
      full: item.urls.full,
    },
    user: {
      name: item.user.name,
      portfolio_url: item.user.portfolio_url || null,
    },
  }));
}