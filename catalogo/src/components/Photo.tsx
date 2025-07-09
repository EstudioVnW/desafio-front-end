"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";


type Photoprops = {
    readonly id: string;
    readonly imageUrl: string;
    readonly photographer: string;
};

export default function Photo({ id, imageUrl, photographer }: Readonly<Photoprops>) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`liked-${id}`);
        setLiked(saved === "true");
    }, [id])

    const toggleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        localStorage.setItem(`liked-${id}`, newLiked.toString());
    };

    return (
        <section className="relative">
            <Image
                src={imageUrl}
                alt={photographer}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
                loading="lazy"
            />
            <button
                onClick={toggleLike}
                className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:scale-110 transition-all"
                aria-label={liked ? "Descurtir" : "Curtir"}>
                {liked ? (
                    <HeartSolid className="h-6 w-6 text-red-500" />
                    ) : (
                    <HeartOutline className="h-6 w-6 text-gray-600" />
                    )
                }
            </button>
            <p className="text-sm mt-2 text-center text-gray-600">{photographer}</p>
        </section>
    );
}