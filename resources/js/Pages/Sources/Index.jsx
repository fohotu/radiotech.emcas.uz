
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';

import CreateSourceForm from './CreateSourceForm';
import UpdateSourceForm from './UpdateSourceForm';

import {
    swalConfirm,
    swalSuccess,
    swalError,
} from '../../Utils/swal';

import {
    Search,
    Plus,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Trash2,
    BookOpen,
    RotateCcw,
    ExternalLink,
} from 'lucide-react';

const sourceTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'regulation', label: 'Regulation' },
    { value: 'recommendation', label: 'Recommendation' },
    { value: 'law', label: 'Law' },
    { value: 'other', label: 'Other' },
];

export default function Index({ sources, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [sourceType, setSourceType] = useState(filters.source_type ?? '');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSource, setActiveSource] = useState(null);

    const sourceItems = sources?.data ?? [];
    const pagination = sources?.links ?? [];

    const handleDelete = async (sourceId) => {
        const confirmed = await swalConfirm(
            'Удалить этот источник?',
            'Запись будет удалена безвозвратно.'
        );

        if (!confirmed) return;

        router.delete(`/source/${sourceId}`, {
            preserveScroll: true,
            onSuccess: () => {
                swalSuccess('Источник успешно удалён');
            },
            onError: () => {
                swalError('Ошибка при удалении источника');
            },
        });
    };

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
                }
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, sourceType]);

    const resetFilters = () => {
        setSearch('');
        setSourceType('');
    };

    const openCreateModal = () => {
        setActiveSource(null);
        setIsModalOpen(true);
    };

    const openUpdateModal = (source) => {
        setActiveSource(source);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setActiveSource(null);
        setIsModalOpen(false);
    };

    const getSourceTypeBadge = (type) => {
        const styles = {
            standard: 'bg-blue-50 text-blue-700 ring-blue-200',
            regulation: 'bg-purple-50 text-purple-700 ring-purple-200',
            recommendation: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
            law: 'bg-amber-50 text-amber-700 ring-amber-200',
            other: 'bg-slate-100 text-slate-600 ring-slate-200',
        };

        return styles[type] || styles.other;
    };

    return (
        <AdminLayout title="Источники">
            <Head title="Источники" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 text-xs font-medium text-slate-400">
                            Управление системой / Источники
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Источники
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Управление стандартами, нормативами и справочными документами.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-lg
                            bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white
                            shadow-sm transition hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        Добавить источник
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Всего источников
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {sources?.total ?? 0}
                                </p>
                            </div>

                            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                                <BookOpen size={22} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    На текущей странице
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {sourceItems.length}
                                </p>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <BookOpen size={22} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <Search size={18} className="text-slate-500" />

                        <h2 className="font-semibold text-slate-900">
                            Поиск и фильтрация
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label
                                htmlFor="search"
                                className="mb-1.5 block text-sm font-medium text-slate-600"
                            >
                                Поиск источников
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="search"
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Название, идентификатор, издатель..."
                                    className="w-full rounded-lg border border-slate-200
                                        bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700
                                        outline-none transition placeholder:text-slate-400
                                        focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="source_type"
                                className="mb-1.5 block text-sm font-medium text-slate-600"
                            >
                                Тип источника
                            </label>

                            <select
                                id="source_type"
                                value={sourceType}
                                onChange={(event) => setSourceType(event.target.value)}
                                className="w-full rounded-lg border border-slate-200
                                    bg-white px-3 py-2.5 text-sm text-slate-700
                                    outline-none transition focus:border-indigo-400
                                    focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Все типы</option>

                                {sourceTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(search || sourceType) && (
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex items-center gap-2 rounded-lg
                                    border border-slate-200 px-3 py-2 text-sm
                                    font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                                <RotateCcw size={15} />
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <BookOpen size={19} className="text-slate-500" />

                            <h2 className="font-semibold text-slate-900">
                                Список источников
                            </h2>
                        </div>

                        <span className="text-sm text-slate-500">
                            Всего: {sources?.total ?? 0}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Источник</th>
                                    <th className="px-5 py-4 font-semibold">Тип</th>
                                    <th className="px-5 py-4 font-semibold">Издатель</th>
                                    <th className="px-5 py-4 font-semibold">Идентификатор</th>
                                    <th className="px-5 py-4 text-right font-semibold">Действия</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {sourceItems.length > 0 ? (
                                    sourceItems.map((source) => (
                                        <tr
                                            key={source.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="max-w-md px-5 py-4">
                                                <div className="font-medium text-slate-800">
                                                    {source.title}
                                                </div>

                                                {source.url && (
                                                    <a
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-1 inline-flex max-w-xs items-center
                                                            gap-1 truncate text-xs text-indigo-600
                                                            hover:text-indigo-800 hover:underline"
                                                    >
                                                        <span className="truncate">{source.url}</span>
                                                        <ExternalLink size={12} className="shrink-0" />
                                                    </a>
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1
                                                        text-xs font-medium capitalize ring-1 ring-inset
                                                        ${getSourceTypeBadge(source.source_type)}`}
                                                >
                                                    {source.source_type || 'other'}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                {source.publisher || '—'}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-slate-600">
                                                {source.identifier || '—'}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => openUpdateModal(source)}
                                                        title="Редактировать"
                                                        className="inline-flex h-8 w-8 items-center
                                                            justify-center rounded-lg bg-indigo-50
                                                            text-indigo-600 transition hover:bg-indigo-100"
                                                    >
                                                        <Pencil size={15} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(source.id)}
                                                        title="Удалить"
                                                        className="inline-flex h-8 w-8 items-center
                                                            justify-center rounded-lg bg-red-50
                                                            text-red-600 transition hover:bg-red-100"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-14 text-center">
                                            <div className="flex flex-col items-center">
                                                <BookOpen size={32} className="mb-3 text-slate-300" />

                                                <p className="font-medium text-slate-600">
                                                    Источники не найдены
                                                </p>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    Измените параметры поиска или добавьте новый источник.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.length > 0 && (
                        <div className="flex flex-col items-center justify-between gap-4
                            border-t border-slate-100 px-5 py-4 sm:flex-row">

                            <p className="text-sm text-slate-500">
                                Показано {sources?.from ?? 0}–{sources?.to ?? 0}
                                {' '}из {sources?.total ?? 0}
                            </p>

                            <div className="flex flex-wrap items-center gap-1">
                                {pagination.map((link, index) => {
                                    const isPrevious = index === 0;
                                    const isNext = index === pagination.length - 1;

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={!link.url || link.active}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.visit(link.url, {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    });
                                                }
                                            }}
                                            className={`flex h-9 min-w-9 items-center justify-center
                                                rounded-lg px-3 text-sm transition
                                                ${link.active
                                                    ? 'bg-indigo-600 font-medium text-white'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                                }
                                                disabled:cursor-not-allowed disabled:opacity-40`}
                                        >
                                            {isPrevious ? (
                                                <ChevronLeft size={17} />
                                            ) : isNext ? (
                                                <ChevronRight size={17} />
                                            ) : (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Update Modal */}
            <Modal
                show={isModalOpen}
                onClose={closeModal}
            >
                {activeSource ? (
                    <UpdateSourceForm
                        source={activeSource}
                        onClose={closeModal}
                    />
                ) : (
                    <CreateSourceForm onClose={closeModal} />
                )}
            </Modal>
        </AdminLayout>
    );
}
