
import { Head, Link, useForm } from '@inertiajs/react';
import {swalSuccess,swalError } from '../../Utils/swal';

const sourceTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'regulation', label: 'Regulation' },
    { value: 'recommendation', label: 'Recommendation' },
    { value: 'law', label: 'Law' },
    { value: 'other', label: 'Other' },
];

export default function CreateSourceForm({onClose}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        source_type: 'standard',
        identifier: '',
        publisher: '',
        description: '',
        url: '',
        metadata: {},
    });

    const submit = (event) => {
        event.preventDefault();

        post('source', {
            preserveScroll: true,
              onSuccess: () => {
                    reset();
                    onClose();
                    swalSuccess('Source Created successfully');
                },
                onError: () => {
                    swalError('Error Create Source');
                },
        });
    };

    const updateField = (field) => (event) => {
        setData(field, event.target.value);
    };

    return (
        <>
            <Head title="Create source" />

            <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={'/source'}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
                        >
                            <span aria-hidden="true">←</span>
                            Back to sources
                        </Link>

                        <div className="mt-4">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Create source
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Add a standard, regulation, or reference
                                document to the terminology database.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Basic information */}
                        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-6 py-4">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Basic information
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Identify and classify the source.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="title"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Title <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={updateField('title')}
                                        placeholder="e.g. ITU Radio Regulations"
                                        autoFocus
                                        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 ${
                                            errors.title
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                    />

                                    {errors.title && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="source_type"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Source type <span className="text-red-500">*</span>
                                    </label>

                                    <select
                                        id="source_type"
                                        value={data.source_type}
                                        onChange={updateField('source_type')}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >
                                        {sourceTypes.map((type) => (
                                            <option
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.source_type && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.source_type}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="identifier"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Identifier
                                    </label>

                                    <input
                                        id="identifier"
                                        type="text"
                                        value={data.identifier}
                                        onChange={updateField('identifier')}
                                        placeholder="e.g. RR, ITU-R P.372"
                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.identifier && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.identifier}
                                        </p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="publisher"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Publisher
                                    </label>

                                    <input
                                        id="publisher"
                                        type="text"
                                        value={data.publisher}
                                        onChange={updateField('publisher')}
                                        placeholder="e.g. International Telecommunication Union (ITU)"
                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.publisher && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.publisher}
                                        </p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={updateField('description')}
                                        placeholder="Describe the purpose and scope of this source..."
                                        className="w-full resize-y rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.description && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Reference and metadata */}
                        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-6 py-4">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Reference details
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Provide a link to the official source.
                                </p>
                            </div>

                            <div className="space-y-5 p-6">
                                <div>
                                    <label
                                        htmlFor="url"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Source URL
                                    </label>

                                    <input
                                        id="url"
                                        type="url"
                                        value={data.url}
                                        onChange={updateField('url')}
                                        placeholder="https://www.itu.int/..."
                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.url && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.url}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Link
                                href={'/source'}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Creating...' : 'Create source'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
