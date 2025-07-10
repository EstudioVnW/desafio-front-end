"use client"

import { useEffect, useState, FormEvent} from "react";
import { getRandomPhotos, searchPhotos} from "@/lib/unsplash";
import Photo from "@/components/Photo";
import PhotoModal from "@/components/Modal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type PhotoType = {
  id: string;
  urls: { small: string; full:string};
  user: { name: string; links:{html:string};};
  description?:string;
};


export default function Home (){
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [ loading,setLoading] =useState(true);
  const [query, setQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);

  useEffect (() =>{
    getRandomPhotos()
      .then(setPhotos)
      .catch(() => alert ("Erro ao carregar as imagens"))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try{
      const results = await searchPhotos(query);
      setPhotos(results);
    } catch {
      alert("Erro ao buscar imagens");
    } finally {
      setLoading(false);
    }
  };
  const handlePhotoClick = (photo: PhotoType) =>{
    setSelectedPhoto(photo);
  };

return(
  <main className="max-w-6xl mx-auto px-4 py-8">
    <a href="/favoritos" className="text-blue-600 underline mb-4 block text-center"> Ver Favoritos</a>
    <form onSubmit={handleSearch} className="flex items-center gap-4 mb-8 justify-center">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar fotos" className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"> 
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
    {loading ? (
      <p className="text-center"> Carregando imagens...</p>
    ): (
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {photos.map ((photo) => (
          <Photo
            key={photo.id}
            id={photo.id}
            imageUrl={photo.urls.small}
            photographer={photo.user.name}
            onClick={() => handlePhotoClick(photo)}
            />
        ))}
      </section>
    )}
    {selectedPhoto && (
      <PhotoModal imageUrl={selectedPhoto.urls.full} photographer={selectedPhoto.user.name} description={selectedPhoto.description} profileUrl={selectedPhoto.user.links.html} onClose={() => setSelectedPhoto(null)}/>
    )}
  </main>
)









}