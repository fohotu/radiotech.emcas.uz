import { useState } from 'react';
import MediaUploader from '@/Components/Media/MediaUploader';
import MediaGallery from '@/Components/Media/MediaGallery';
import Modal from '@/Components/Modal';
export default function Index({media: initialMedia }) {

    const [media, setMedia] = useState(initialMedia || []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUploaded = (uploaded) => {
        console.log('Uploaded media:', uploaded);
        setMedia((current) => [
            ...current,
            uploaded,
        ]);
    };

    const handleDeleted = (deleted) => {
        setMedia((current) =>
            current.filter((item) => item.id !== deleted.id)
        );
    };

    return (
        <div className="space-y-6">
            <Modal 
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="max-w-6xl"
                maxHeight="max-h-[90vh]"
            >
                 <MediaUploader
                    endpoint={`/media`}
                    collection="images"
                    maxFiles={10}
                    onUploaded={handleUploaded}
                />
                <MediaGallery
                    media={media}
                    deleteUrl="/media/:id"
                    onDeleted={handleDeleted}
                    columns={4}
                />
                <p className="text-sm text-gray-500">
                    Total images: {media.length}
                </p>
            </Modal>

            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
            >
                Open Media Manager
            </button>
           
        </div>
    );
}