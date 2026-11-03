import { useState } from 'react';
import MediaUploader from '@/Components/Media/MediaUploader';
import MediaGallery from '@/Components/Media/MediaGallery';

export default function EditTechnology({ technology }) {

    const [media, setMedia] = useState(technology.media || []);

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

    /*
    const [media, setMedia] = useState(technology.media || []);

    const handleUploaded = (response) => {
        console.log('Upload response:', response);
        const uploaded = response?.media;
      //  console.log(response.media,'Uploaded media:', uploaded);
        if(!uploaded){
            console.error('Invalid upload response:', response);
            return;
        }
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
    */

    return (
        <div className="space-y-6">

            <h2 className="text-lg font-semibold">
                Technology images
            </h2>

            <MediaUploader
                endpoint={`/technologies/${technology.id}/media`}
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

        </div>
    );
}