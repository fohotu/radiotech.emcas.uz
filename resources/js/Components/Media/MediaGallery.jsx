
import { useState,useEffect } from 'react';
import {
    Image,
    FileText,
    File,
    Eye,
    Trash2,
    Download,
    X,
    LoaderCircle,
} from 'lucide-react';
//import MediaPreview from '@/Components/Media/MediaPreview';

export default function MediaGallery({
    media = [],
    deleteUrl,
    onDeleted,
    onError,
    columns = 4,
}) {
    const [items, setItems] = useState(media);
    const [preview, setPreview] = useState(null);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        setItems([...media]);

        console.log('MediaGallery media prop changed:', media);
    }, [media]);

    const getFileIcon = (mimeType) => {
        if (mimeType?.startsWith('image/')) {
            return Image;
        }

        if (mimeType === 'application/pdf') {
            return FileText;
        }

        return File;
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 KB';

        return bytes >= 1024 * 1024
            ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
            : `${(bytes / 1024).toFixed(2)} KB`;
    };

    const handleDelete = async (item) => {
        if (!window.confirm(`Delete ${item.name}?`)) {
            return;
        }

        setDeleting(item.id);

        try {
            const response = await fetch(
                deleteUrl.replace(':id', item.id),
                {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN':
                            document.querySelector(
                                'meta[name="csrf-token"]'
                            )?.getAttribute('content'),

                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete file.');
            }

            setItems((current) =>
                current.filter((file) => file.id !== item.id)
            );

            setPreview((current) =>
                current?.id === item.id ? null : current
            );

            onDeleted?.(item);
        } catch (error) {
            onError?.(error);
            if (!onError) {
                alert(error.message);
            }
        } finally {
            setDeleting(null);
        }
    };


    const gridColumns = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 sm:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
        5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    };

    return (
        <div className="space-y-4">

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-10 text-gray-500">
                    <Image size={40} className="mb-3" />

                    <p className="text-sm">
                        No files uploaded yet.
                    </p>
                </div>
            ) : (
                <div className={`grid ${gridColumns[columns] || gridColumns[4]} gap-3`}>
                    {items.map((item) => {
                        const FileIcon = getFileIcon(item.mime_type);

                        const isImage = item.mime_type?.startsWith('image/');

                        return (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded border border-gray-200 bg-white max-w-48 mx-auto"
                            >
                                <div className="relative flex aspect-[4/3] max-h-36 items-center justify-center overflow-hidden bg-gray-100">
                                    {isImage ? (
                                        <img
                                            src={item.thumbnail || item.url}
                                            alt={item.name}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <FileIcon
                                            size={48}
                                            className="text-gray-400"
                                        />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100">
                                        <button
                                            type="button"
                                            onClick={() => setPreview(item)}
                                            className="rounded-md bg-white p-2 text-gray-700 hover:bg-gray-100"
                                            title="Preview"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item)}
                                            disabled={deleting === item.id}
                                            className="rounded-md bg-white p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deleting === item.id ? (
                                                <LoaderCircle
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>

                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            download
                                            className="rounded-md bg-white p-2 text-gray-700 hover:bg-gray-100"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </a>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <p
                                        className="truncate text-sm font-medium text-gray-800"
                                        title={item.name}
                                    >
                                        {item.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {formatSize(item.size)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {preview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setPreview(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-5xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setPreview(null)}
                            className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-2 text-gray-700 shadow"
                        >
                            <X size={20} />
                        </button>

                        {preview.mime_type?.startsWith('image/') ? (
                            <img
                                src={preview.url}
                                alt={preview.name}
                                className="max-h-[85vh] max-w-full rounded-lg object-contain"
                            />
                        ) : preview.mime_type === 'application/pdf' ? (
                            <iframe
                                src={preview.url}
                                title={preview.name}
                                className="h-[85vh] w-[80vw] rounded-lg bg-white"
                            />
                        ) : (
                            <div className="rounded-lg bg-white p-8">
                                <FileText
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                />

                                <p className="text-center text-gray-800">
                                    {preview.name}
                                </p>

                                <a
                                    href={preview.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 block text-center text-blue-600"
                                >
                                    Open file
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
