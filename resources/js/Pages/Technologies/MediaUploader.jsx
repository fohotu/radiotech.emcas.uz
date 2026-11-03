import { useState } from 'react';


import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Dashboard from '@uppy/react/dashboard';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';

export default function MediaUploader({
    modelType,
    modelId,
    collection = 'images',
    onUploaded,
}) {
    const [uppy] = useState(() =>
        new Uppy({
            id: `media-${modelType}-${modelId}`,
            autoProceed: false,
            restrictions: {
                maxNumberOfFiles: 10,
                maxFileSize: 10 * 1024 * 1024,
                allowedFileTypes: [
                    'image/*',
                    '.pdf',
                ],
            },
        })
        .use(XHRUpload, {
            endpoint: `/admin/media/${modelType}/${modelId}`,
            method: 'POST',
            fieldName: 'file',
            formData: true,
            headers: {
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content'),
                'Accept': 'application/json',
            },
        })
    );

    uppy.on('upload-success', (file, response) => {
        onUploaded?.(response.body);
    });

    return (
        <Dashboard
            uppy={uppy}
            height={400}
            proudlyDisplayPoweredByUppy={false}
            showProgressDetails
        />
    );
}