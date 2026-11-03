import { useEffect, useMemo, useRef } from 'react';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Dashboard from '@uppy/react/dashboard';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';


const DEFAULT_ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

export default function MediaUploader({
    endpoint,
    collection = 'images',
    maxFiles = 10,
    maxFileSize = 10 * 1024 * 1024,
    allowedFileTypes = DEFAULT_ALLOWED_FILE_TYPES,
    onUploaded,
    onError,
}) {
    const onUploadedRef = useRef(onUploaded);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onUploadedRef.current = onUploaded;
        onErrorRef.current = onError;
    }, [onUploaded, onError]);

    const uppy = useMemo(() => {
        return new Uppy({
            autoProceed: false,
            restrictions: {
                maxNumberOfFiles: maxFiles,
                maxFileSize,
                allowedFileTypes,
            },
            locale: {
                strings: {
                    dropPasteFiles: 'Перетащите файлы сюда или %{browse}',
                    browse: 'выберите файлы',
                    uploadComplete: 'Загрузка завершена',
                },
            },
        }).use(XHRUpload, {
            endpoint,
            method: 'POST',
            fieldName: 'file',
            formData: true,
            bundle: false,
            headers: {
                'X-CSRF-TOKEN':
                    document.querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content'),
                Accept: 'application/json',
            },
            allowedMetaFields: ['collection'],
        });
    }, [endpoint, maxFiles, maxFileSize, allowedFileTypes]);

    useEffect(() => {
        uppy.setMeta({ collection });

       const handleUploadSuccess = (file, response) => {
            const uploaded = response.body?.media;

            if (!uploaded) {
                console.error('Invalid media response:', response.body);
                return;
            }

            onUploadedRef.current?.(uploaded);
        };

        const handleUploadError = (file, error) => {
            console.error('Uppy upload error:', error);

            onErrorRef.current?.({
                file,
                error,
            });
        };

        uppy.on('upload-success', handleUploadSuccess);
        uppy.on('upload-error', handleUploadError);

        return () => {
            uppy.off('upload-success', handleUploadSuccess);
            uppy.off('upload-error', handleUploadError);
        };
    }, [uppy, collection]);

    useEffect(() => {
        return () => {
            uppy.destroy();
        };
    }, [uppy]);

    return (
         <div className="w-full min-w-0">
                <div className="w-full p-2">
                    <Dashboard
                        uppy={uppy}
                        height={320}
                        proudlyDisplayPoweredByUppy={false}
                        showProgressDetails
                        hideUploadButton={false}
                        hideRetryButton={false}
                        hidePauseResumeButton={false}
                    />
                </div>
         </div>
        
    );
}