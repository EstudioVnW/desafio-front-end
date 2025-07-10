"use client"

import { useEffect, useState } from "react";
import Photo from "@/components/Photo";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link"


type FavoritePhoto = {
    id: string;
    imageUrl: string;
    photographer: string;
};

export default function FavoritosPage() {
    const [favorites, setFavorites] = useState<FavoritePhoto[]>([]);

    useEffect(() => {
        const keys = Object.keys(localStorage).filter((key) => key.startsWith("liked-") && localStorage.getItem(key) === "true");
        const savedFavorites: FavoritePhoto[] = keys.map((key) => {
            const id = key.replace("liked-", "");
            const data = localStorage.getItem(`photo-${id}`);
            return data ? JSON.parse(data) : null;
        }).filter(Boolean);

        setFavorites(savedFavorites);
    }, []);


    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center"><Link href="/" aria-label="Voltar para a página inicial">
                <StarIcon className="h-6 w-6 text-yellow-400 hover:text-yellow-500 transition duration-200 mx-auto mb-4" />
            </Link>
                Fotos Favoritas</h1>
            {favorites.length > 0 ? (
                <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {favorites.map((photo) => (
                        <Photo key={photo.id} id={photo.id} imageUrl={photo.imageUrl} photographer={photo.photographer} />
                    ))}
                </section>
            ) : (
                <p className="text-center text-gray-500">Nenhuma foto favoritada ainda</p>
            )}
        </main>
    );
}