import { Heart } from "lucide-react";
import { Photo } from "../styles/types/photo";

interface Props {
  photo: Photo;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function PhotoCard({ photo, onClick, isFavorite, onToggleFavorite }: Props) {
  return (
    <div
      className={`relative cursor-pointer group rounded-lg overflow-hidden shadow bg-white transition duration-300 ${
        isFavorite ? "ring-2 ring-pink-500" : ""
      } hover:shadow-2xl hover:scale-105`}
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-2 right-2 z-10 text-pink-500 hover:scale-110 transition-transform ease-in-out duration-300"
      >
        {isFavorite ? <Heart fill="currentColor" /> : <Heart />}
      </button>
      <img
        src={photo.urls.small}
        alt={photo.alt_description || `Foto de ${photo.user.name}`}
        loading="lazy"
        className="w-full aspect-[3/4] object-cover transition duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2">
        {photo.user.name}
      </div>
    </div>
  );
}
