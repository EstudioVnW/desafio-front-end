import React, { useEffect, useState } from "react";
import { getImages } from "../services/unsplashService";

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getImages("nature"); // ou outra palavra-chave
        setImages(result);
      } catch (err) {
        setError("Erro ao carregar imagens.");
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  if (loading) return <p>Carregando imagens...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.urls.small}
          alt={img.alt_description || "Imagem do Unsplash"}
          className="rounded shadow w-64 h-64 object-cover"
        />
      ))}
    </div>
  );
};

export default ImageGallery;
