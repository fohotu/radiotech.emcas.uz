import { useState, useEffect } from 'react';
import MediaUploader from '@/Components/Media/MediaUploader';
import MediaGallery from '@/Components/Media/MediaGallery';

export default function MediaManager({
    media: initialMedia,
    callBack,
    selectedMediaId = null,
}) {
    const [media, setMedia] = useState(initialMedia || []);

    const [selectedImage, setSelectedImage] = useState(
        () => initialMedia?.find(item => item.id === selectedMediaId) ?? null
    );

    useEffect(() => {
        setMedia(initialMedia || []);

        setSelectedImage(
            initialMedia?.find(item => item.id === selectedMediaId) ?? null
        );
    }, [initialMedia, selectedMediaId]);

    const handleUploaded = (uploaded) => {
        setMedia(current => [...current, uploaded]);
    };

    const handleDeleted = (deleted) => {
        setMedia(current =>
            current.filter(item => item.id !== deleted.id)
        );

        if (selectedImage?.id === deleted.id) {
            setSelectedImage(null);
            callBack?.(null);
        }
    };

    const handleImageSelect = (item) => {
        setSelectedImage(item);
        callBack?.(item);
    };

    return (
        <div className="space-y-6">
            <MediaUploader
                endpoint="/media"
                collection="images"
                maxFiles={10}
                onUploaded={handleUploaded}
            />

            <MediaGallery
                media={media}
                deleteUrl="/media/:id"
                onDeleted={handleDeleted}
                columns={4}
                selectedId={selectedImage?.id}
                onSelect={handleImageSelect}
            />

            <p className="text-sm text-gray-500">
                Total images: {media.length}
            </p>
        </div>
    );
}