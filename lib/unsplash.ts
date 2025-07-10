export interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    portfolio_url: string | null;
  };
}

export async function searchPhotos(query: string) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=20`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro na busca:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar fotos da Unsplash:", error);
    return [];
  }
}

