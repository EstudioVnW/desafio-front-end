export async function searchPhotos(query: string) {
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );
    if (!response.ok) {
        throw new Error("Erro ao buscar as fotos");
    }
    const data = await response.json()
    return data.results;
}
    export async function getRandomPhotos() {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?count=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar fotos aleatórias");
        }

        const data = await response.json();
        return data;
    }

