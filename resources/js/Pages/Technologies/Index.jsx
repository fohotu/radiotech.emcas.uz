
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import {
    Search,
    Plus,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Image,
    Cpu,
    Layers,
    X,
} from 'lucide-react';

import CreateTechnologyForm from './CreateTechnologyForm';
import UpdateTechnologyForm from './UpdateTechnologyForm';

import Modal from '@/Components/Modal';
import MediaManager from '@/Components/Media/MediaManager';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({
    technologies,
    categories = [],
    filters = {},
    media,
    selected_media_id,
}) {

    console.log(technologies);

    const [search, setSearch] = useState(filters.search ?? '');
    const [categoryId, setCategoryId] = useState(filters.category_id ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [activeTechnology, setActiveTechnology] = useState(null);

    const items = technologies?.data ?? [];
    const links = technologies?.links ?? [];

    useEffect(() => {
        setSearch(filters.search ?? '');
        setCategoryId(filters.category_id ?? '');
        setStatus(filters.status ?? '');
    }, [filters]);

    // Search and filters
    const applyFilters = (e) => {
        e.preventDefault();

        router.get(
            '/admin/technologies',
            {
                search: search || undefined,
                category_id: categoryId || undefined,
                status: status || undefined,
                per_page: filters.per_page ?? 15,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    // Reset filters
    const resetFilters = () => {
        setSearch('');
        setCategoryId('');
        setStatus('');

        router.get(
            '/admin/technologies',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    // Create technology
    const openCreateModal = () => {
        setActiveTechnology(null);
        setIsModalOpen(true);
    };

    // Edit technology
    const openEditModal = (technology) => {
        setActiveTechnology(technology);
        setIsModalOpen(true);
    };

    // Close technology modal
    const closeTechnologyModal = () => {
        setActiveTechnology(null);
        setIsModalOpen(false);
    };

    // Open media manager
    const openMediaModal = (technology) => {
        setActiveTechnology(technology);
        setMediaModalOpen(true);
    };

    // Close media manager
    const closeMediaModal = () => {
        setActiveTechnology(null);
        setMediaModalOpen(false);
    };

    // Delete technology
    const deleteTechnology = (technology) => {
        if (!confirm(`Удалить технологию "${technology.name}"?`)) {
            return;
        }

        router.delete(`/admin/technologies/${technology.id}`, {
            preserveScroll: true,
        });
    };

    // Attach media to technology
    const attachMediaToTechnology = (technologyId, mediaId) => {
        router.post(
            `/admin/technologies/${technologyId}/attach-media`,
            {
                media_id: mediaId,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeMediaModal();
                },
            },
        );
    };

    // Pagination labels
    const paginationLabel = (label) => {
        if (label.includes('Previous')) {
            return 'Назад';
        }

        if (label.includes('Next')) {
            return 'Вперёд';
        }

        return label.replace(/&laquo;|&raquo;/g, '');
    };

    const hasFilters = Boolean(search || categoryId || status);

    return (
        <AdminLayout title="Технологии радиосвязи">
            <Head title="Технологии радиосвязи" />

            <div className="mx-auto w-full max-w-[1600px] space-y-6">

                {/* Page header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Справочник</span>
                            <span>/</span>
                            <span className="text-indigo-600">Технологии</span>
                        </div>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Технологии радиосвязи
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Управление технологиями и их классификацией
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-700/10 bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:translate-y-px focus:outline-none focus:ring-4 focus:ring-indigo-100"
                    >
                        <Plus size={18} />
                        Добавить технологию
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-100">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <Cpu size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Всего технологий
                            </p>

                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                {technologies?.total ?? items.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-100">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Layers size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Категории
                            </p>

                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                {categories.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-100">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Image size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                На текущей странице
                            </p>

                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                {items.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-100">

                    <div className="mb-4">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Поиск и фильтрация
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Найдите технологию по названию, категории или статусу
                        </p>
                    </div>

                    <form onSubmit={applyFilters}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                            {/* Search */}
                            <div className="xl:col-span-2">
                                <label
                                    htmlFor="search"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Поиск
                                </label>

                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="search"
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Название, обозначение или сокращение..."
                                        className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Категория
                                </label>

                                <select
                                    id="category_id"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                >
                                    <option value="">Все категории</option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Статус
                                </label>

                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                >
                                    <option value="">Все статусы</option>
                                    <option value="draft">Черновик</option>
                                    <option value="published">Опубликовано</option>
                                    <option value="archived">В архиве</option>
                                </select>
                            </div>
                        </div>

                        {/* Filter buttons */}
                        <div className="mt-5 flex flex-wrap justify-end gap-2">
                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                                >
                                    <X size={16} />
                                    Сбросить
                                </button>
                            )}

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 active:translate-y-px"
                            >
                                <Search size={16} />
                                Найти
                            </button>
                        </div>
                    </form>
                </div>

                {/* Technologies table */}
                <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm shadow-slate-100">

                    {/* Table heading */}
                    <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Список технологий
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Зарегистрированные технологии радиосвязи
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                            <span className="size-2 rounded-full bg-indigo-500" />
                            {technologies?.total ?? 0} записей
                        </span>
                    </div>

                    {/* Table content */}
                    {items.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50/60">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Технология
                                            </th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Категория
                                            </th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Статус
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Действия
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {items.map((technology) => (
                                            <tr
                                                key={technology.id}
                                                className="group transition-colors hover:bg-slate-50/80"
                                            >
                                                {/* Technology */}
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-slate-800 transition group-hover:text-indigo-700">
                                                        {technology.name}
                                                    </div>

                                                    {technology.abbreviation && (
                                                        <div className="mt-1 text-xs font-medium text-slate-500">
                                                            {technology.abbreviation}
                                                        </div>
                                                    )}

                                                    {technology.slug && (
                                                        <div className="mt-1 text-xs text-slate-400">
                                                            {technology.slug}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Category */}
                                                <td className="px-5 py-4 text-sm text-slate-600">
                                                    {technology.category_name ?? '—'}
                                                </td>

                                               

                                                {/* Status */}
                                                <td className="px-5 py-4">
                                                    <StatusBadge status={technology.status} />
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1.5">

                                                        {/* Media */}
                                                        <button
                                                            type="button"
                                                            title="Управление изображениями"
                                                            onClick={() => openMediaModal(technology)}
                                                            className="inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all duration-200 hover:border-violet-100 hover:bg-violet-50 hover:text-violet-600"
                                                        >
                                                            <Image size={17} />
                                                        </button>

                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            title="Редактировать"
                                                            onClick={() => openEditModal(technology)}
                                                            className="inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all duration-200 hover:border-amber-100 hover:bg-amber-50 hover:text-amber-600"
                                                        >
                                                            <Pencil size={17} />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            title="Удалить"
                                                            onClick={() => deleteTechnology(technology)}
                                                            className="inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all duration-200 hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 size={17} />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {links.length > 3 && (
                                <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">

                                    <p className="text-sm text-slate-500">
                                        Показано{' '}
                                        <span className="font-semibold text-slate-700">
                                            {technologies?.from ?? 0}–{technologies?.to ?? 0}
                                        </span>
                                        {' '}из{' '}
                                        <span className="font-semibold text-slate-700">
                                            {technologies?.total ?? 0}
                                        </span>
                                    </p>

                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {links.map((link, index) => {
                                            const label = paginationLabel(link.label);

                                            return (
                                                <button
                                                    key={`${index}-${link.label}`}
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
                                                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
                                                        link.active
                                                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600'
                                                    } disabled:cursor-not-allowed disabled:opacity-40`}
                                                >
                                                    {label.includes('Назад') ? (
                                                        <ChevronLeft size={16} />
                                                    ) : label.includes('Вперёд') ? (
                                                        <ChevronRight size={16} />
                                                    ) : (
                                                        label
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Empty state */
                        <div className="flex flex-col items-center px-6 py-20 text-center">
                            <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <Cpu size={28} strokeWidth={1.5} />
                            </div>

                            <h3 className="mt-5 text-base font-semibold text-slate-800">
                                Технологии не найдены
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                По заданным параметрам ничего не найдено.
                                Попробуйте изменить фильтры или добавьте новую технологию.
                            </p>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                                >
                                    Сбросить фильтры
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Update technology modal */}
            <Modal
                show={isModalOpen}
                onClose={closeTechnologyModal}
                title={activeTechnology ? 'Редактировать технологию' : 'Добавить технологию'}
            >
                {activeTechnology ? (
                    <UpdateTechnologyForm
                        technology={activeTechnology}
                        onClose={closeTechnologyModal}
                        categories={categories}
                    />
                ) : (
                    <CreateTechnologyForm
                        onClose={closeTechnologyModal}
                        categories={categories}
                    />
                )}
            </Modal>

            {/* Media manager modal */}
            <Modal
                show={mediaModalOpen}
                onClose={closeMediaModal}
                maxWidth="max-w-6xl"
                maxHeight="max-h-[90vh]"
            >
                <MediaManager
                    media={media}
                    selectedMediaId={
                        activeTechnology?.selected_media_id ??
                        selected_media_id ??
                        null
                    }
                    callBack={(selectedMedia) => {
                        if (activeTechnology && selectedMedia) {
                            attachMediaToTechnology(
                                activeTechnology.id,
                                selectedMedia.id,
                            );
                        }
                    }}
                />
            </Modal>
        </AdminLayout>
    );
}

// Status badge
function StatusBadge({ status }) {
    const styles = {
        draft: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        published: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        archived: 'bg-slate-100 text-slate-600 ring-slate-500/20',
    };

    const labels = {
        draft: 'Черновик',
        published: 'Опубликовано',
        archived: 'В архиве',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                styles[status] ?? 'bg-slate-100 text-slate-600 ring-slate-500/20'
            }`}
        >
            <span className="size-1.5 rounded-full bg-current" />
            {labels[status] ?? status ?? '—'}
        </span>
    );
}
