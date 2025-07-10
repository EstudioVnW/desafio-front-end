"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";


type Photoprops = {
    readonly id: string;
    readonly imageUrl: string;
    readonly photographer: string;
    onClick?: () => void;
};

export default function Photo({ id, imageUrl, photographer, onClick }: Readonly<Photoprops>) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`liked-${id}`);
        setLiked(saved === "true");
    }, [id])

    const toggleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        localStorage.setItem(`liked-${id}`, newLiked.toString());

        const photoData = {
            id,
            imageUrl,
            photographer,
        };
        if (newLiked){
            localStorage.setItem(`photo-${id}`, JSON.stringify(photoData));
        }else {
            localStorage.removeItem(`photo-${id}`);
        }
    };

    return (
        <button className="relative cursor-pointer group"  onClick={onClick}>
            <Image
                src={imageUrl}
                alt={photographer}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
                loading="lazy"
            />
            <button
                onClick={(e)=>{e.stopPropagation(); toggleLike();}}
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
        </button>
    );
}