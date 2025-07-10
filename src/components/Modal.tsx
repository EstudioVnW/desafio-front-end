import React, { useEffect, useState } from "react";
import { Photo } from "../styles/types/photo";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: Photo | null;
}

export default function Modal({ isOpen, onClose, photo }: ModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!photo || !show) return null;

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-lg max-w-lg w-full p-6 relative transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        <img
          src={photo.urls.small}
          alt={photo.alt_description || `Foto de ${photo.user.name}`}
          className="w-full h-auto rounded"
          loading="lazy"
        />

        <h2 className="mt-4 font-semibold text-lg">{photo.user.name}</h2>

        {photo.alt_description && (
          <p className="mt-2 text-gray-700">{photo.alt_description}</p>
        )}

        {photo.user.portfolio_url && (
          <a
            href={photo.user.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Ver portfólio do autor
          </a>
        )}
      </div>
    </div>
  );
}
