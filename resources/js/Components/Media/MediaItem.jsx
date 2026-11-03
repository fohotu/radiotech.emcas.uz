
import {
    Image,
    FileText,
    File,
    Eye,
    Trash2,
    Download,
    LoaderCircle,
} from 'lucide-react';

export default function MediaItem({
    media,
    onPreview,
    onDelete,
    deleting = false,
}) {
    const isImage = media.mime_type?.startsWith('image/');
    const isPdf = media.mime_type === 'application/pdf';

    const FileIcon = isImage
        ? Image
        : isPdf
            ? FileText
            : File;

    const formatSize = (bytes) => {
        if (!bytes) return '0 KB';

        return bytes >= 1024 * 1024
            ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
            : `${(bytes / 1024).toFixed(2)} KB`;
    };

    return (
        <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white">

            {/* Preview image */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-100">

                {isImage ? (
                    <img
                        src={media.thumbnail || media.url}
                        alt={media.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <FileIcon
                        size={48}
                        className="text-gray-400"
                    />
                )}

                {/* Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">

                    <button
                        type="button"
                        onClick={() => onPreview?.(media)}
                        disabled={deleting}
                        title="Preview"
                        className="rounded-md bg-white p-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        <Eye size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete?.(media)}
                        disabled={deleting}
                        title="Delete"
                        className="rounded-md bg-white p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                        {deleting ? (
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <Trash2 size={18} />
                        )}
                    </button>

                    <a
                        href={media.url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        title="Download"
                        aria-disabled={deleting}
                        onClick={(event) => {
                            if (deleting) {
                                event.preventDefault();
                            }
                        }}
                        className="rounded-md bg-white p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Download size={18} />
                    </a>

                </div>
            </div>

            {/* File information */}
            <div className="p-3">
                <p
                    className="truncate text-sm font-medium text-gray-800"
                    title={media.name}
                >
                    {media.name}
                </p>

                <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-500">
                        {formatSize(media.size)}
                    </span>

                    <span className="text-xs text-gray-400 uppercase">
                        {media.mime_type?.split('/')[1] || 'FILE'}
                    </span>
                </div>
            </div>

        </div>
    );
}
