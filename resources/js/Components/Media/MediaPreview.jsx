
import { useEffect } from 'react';

import {
    X,
    Download,
    FileText,
    File,
    ExternalLink,
} from 'lucide-react';

export default function MediaPreview({
    media,
    onClose,
}) {
    useEffect(() => {
        if (!media) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [media, onClose]);

    if (!media) return null;

    const isImage = media.mime_type?.startsWith('image/');
    const isPdf = media.mime_type === 'application/pdf';

    const FileIcon = isPdf ? FileText : File;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={onClose}
        >
            <div
                className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">

                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-800">
                            {media.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            {media.mime_type} · {formatSize(media.size)}
                        </p>
                    </div>

                    <div className="ml-4 flex shrink-0 items-center gap-2">

                        <a
                            href={media.url}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                            title="Download"
                        >
                            <Download size={19} />
                        </a>

                        <a
                            href={media.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                            title="Open in new tab"
                        >
                            <ExternalLink size={19} />
                        </a>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                            title="Close"
                        >
                            <X size={20} />
                        </button>

                    </div>
                </div>

                {/* Content */}
                <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-gray-100">

                    {isImage ? (
                        <img
                            src={media.url}
                            alt={media.name}
                            className="max-h-[82vh] max-w-full object-contain"
                        />
                    ) : isPdf ? (
                        <iframe
                            src={media.url}
                            title={media.name}
                            className="h-[82vh] w-full bg-white"
                        />
                    ) : (
                        <div className="flex flex-col items-center p-12 text-center">

                            <FileIcon
                                size={72}
                                className="mb-4 text-gray-400"
                            />

                            <h4 className="text-lg font-medium text-gray-800">
                                {media.name}
                            </h4>

                            <p className="mt-2 text-sm text-gray-500">
                                Preview is not available for this file type.
                            </p>

                            <a
                                href={media.url}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="mt-5 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                <Download size={17} />
                                Download file
                            </a>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

function formatSize(bytes) {
    if (!bytes) return '0 KB';

    return bytes >= 1024 * 1024
        ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
        : `${(bytes / 1024).toFixed(2)} KB`;
}
