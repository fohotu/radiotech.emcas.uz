
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import CreateSourceForm from './CreateSourceForm';
import UpdateSourceForm from './UpdateSourceForm';

import { Search, Plus, Eye, Pencil, ChevronLeft, ChevronRight,Trash } from 'lucide-react';

const sourceTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'regulation', label: 'Regulation' },
    { value: 'recommendation', label: 'Recommendation' },
    { value: 'law', label: 'Law' },
    { value: 'other', label: 'Other' },
];

export default function Index({ sources, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [sourceType, setSourceType] = useState(
        filters.source_type ?? '',
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSource,setActiveSource] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
               '/source',
                {
                    search: search || undefined,
                    source_type: sourceType || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, sourceType]);

    const pagination = sources.links ?? [];

    return (
        <>
            <Head title="Sources" />


             <Modal
                            show={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title="Добавить термин"
                        >
                            {
                                activeSource ?
                                    <UpdateSourceForm
                                        source={activeSource}
                                        onClose={() => {
                                            setActiveSource(null);
                                            setIsModalOpen(false)
                                        }}
                                    />  
                                :
                                <CreateSourceForm 
                                    onClose={() => setIsModalOpen(false)}
                                />
                            }
                           
                        </Modal>

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Sources
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage standards, regulations, and reference
                                documents.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} />
                            Добавить источник
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="search"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Search sources
                                </label>

                                <div className="relative">
                                    <svg
                                        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m16 16 4 4" />
                                    </svg>

                                    <input
                                        id="search"
                                        type="search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search by title, identifier, publisher..."
                                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="source_type"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Source type
                                </label>

                                <select
                                    id="source_type"
                                    value={sourceType}
                                    onChange={(event) =>
                                        setSourceType(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">All types</option>

                                    {sourceTypes.map((type) => (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                            <h2 className="text-sm font-semibold text-gray-900">
                                All sources
                            </h2>

                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                {sources.total ?? 0} total
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold">
                                            Source
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Type
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Publisher
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Identifier
                                        </th>
                                        <th className="px-5 py-3 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {sources.data?.length > 0 ? (
                                        sources.data.map((source) => (
                                            <tr
                                                key={source.id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="font-medium text-gray-900">
                                                        {source.title}
                                                    </div>

                                                    {source.url && (
                                                        <a
                                                            href={source.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="mt-1 inline-block max-w-xs truncate text-xs text-blue-600 hover:underline"
                                                        >
                                                            {source.url}
                                                        </a>
                                                    )}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-xs font-medium capitalize text-blue-700">
                                                        {source.source_type}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {source.publisher || '—'}
                                                </td>

                                                <td className="px-5 py-4 font-mono text-xs text-gray-600">
                                                    {source.identifier || '—'}
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <Link
                                                        href={'edit/'}
                                                        className="font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-5 py-16 text-center"
                                            >
                                                <div className="text-sm font-medium text-gray-900">
                                                    No sources found
                                                </div>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Try changing your filters
                                                    or create a new source.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pagination.length > 0 && (
                            <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing{' '}
                                    <span className="font-medium text-gray-900">
                                        {sources.from ?? 0}
                                    </span>
                                    {' '}to{' '}
                                    <span className="font-medium text-gray-900">
                                        {sources.to ?? 0}
                                    </span>
                                    {' '}of{' '}
                                    <span className="font-medium text-gray-900">
                                        {sources.total ?? 0}
                                    </span>
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {pagination.map((link, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={
                                                !link.url || link.active
                                            }
                                            onClick={() => {
                                                if (link.url) {
                                                    router.visit(link.url, {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    });
                                                }
                                            }}
                                            className={`rounded-lg px-3 py-2 text-sm transition ${
                                                link.active
                                                    ? 'bg-blue-600 font-semibold text-white'
                                                    : link.url
                                                      ? 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                      : 'cursor-not-allowed text-gray-300'
                                            }`}
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
