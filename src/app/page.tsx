import ImageGallery from "../components/ImageGallery";

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Galeria de Imagens Unsplash</h1>
      <ImageGallery />
    </main>
  );
}
