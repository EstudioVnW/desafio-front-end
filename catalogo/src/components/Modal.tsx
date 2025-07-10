"use client"

import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = Readonly<{
    imageUrl: string;
    photographer: string;
    description?: string;
    profileUrl: string;
    onClose: () => void;
}>;

export default function PhotoModal({
    imageUrl,
    photographer,
    description,
    profileUrl,
    onClose,
}: Readonly<ModalProps>) {
    const handleBackdropClick = () => {
        onClose();
    };
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={handleBackdropClick} role="dialog" tabIndex={0} onKeyDown={(e) => {if (e.key === "Enter" || e.key === "Escape"){handleBackdropClick();}}}>
            <section onClick={stopPropagation} className="bg-white dark:bg-gray-900 p-6 rounded-lg relative max-w-lg w-full shadow-xl">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-500" aria-label="Fechar">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <Image src={imageUrl} alt={photographer} width={600} height={400} className="rounded-lg w-full h-auto object-cover" />

                <section className="mt-4 text-center">
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                        {photographer}
                    </h2>
                    {description && (<p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        {description}
                    </p>)}
                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm mt-2 block">
                        Ver perfil no Unsplash
                    </a>
                </section>
            </section>
        </div >
    )
}