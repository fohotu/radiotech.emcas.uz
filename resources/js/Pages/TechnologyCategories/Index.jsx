
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Plus,
    Pencil,
    Trash,
    Search,
    RotateCcw,
} from 'lucide-react';

import Modal from '@/Components/Modal';
import CreateTechnologyCategoryForm from './CreateTechnologyCategoryForm';
import UpdateTechnologyCategoryForm from './UpdateTechnologyCategoryForm';

export default function Index({ categories, parentCategories = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [parentId, setParentId] = useState(filters.parent_id ?? '');
    const [isPublished, setIsPublished] = useState(
        filters.is_published ?? '',
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        setSearch(filters.search ?? '');
        setParentId(filters.parent_id ?? '');
        setIsPublished(filters.is_published ?? '');
    }, [filters]);

    const applyFilters = (event) => {
        event.preventDefault();

        router.get(
            '/technology-categories',
            {
                search: search || undefined,
                parent_id: parentId || undefined,
                is_published:
                    isPublished === '' ? undefined : isPublished,
                per_page: filters.per_page ?? 15,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setParentId('');
        setIsPublished('');

        router.get(
            '/technology-categories',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveCategory(null);
    };

    const openCreateModal = () => {
        setActiveCategory(null);
        setIsModalOpen(true);
    };

    const openUpdateModal = (category) => {
        setActiveCategory(category);
        setIsModalOpen(true);
    };

    const deleteCategory = (category) => {
        if (
            !confirm(
                `Удалить категорию "${category.name}"?`,
            )
        ) {
            return;
        }

        router.delete(
            `/technology-categories/${category.id}`,
            {
                preserveScroll: true,
            },
        );
    };

    const paginationLabel = (label) => {
        if (label.includes('Previous')) return '← Назад';
        if (label.includes('Next')) return 'Вперёд →';

        return label.replace(/&laquo;|&raquo;/g, '');
    };

    return (
        <>
            <Head title="Категории технологий" />

            <Modal
                show={isModalOpen}
                onClose={closeModal}
                title={
                    activeCategory
                        ? 'Редактировать категорию'
                        : 'Добавить категорию'
                }
            >
                {activeCategory ? (
                    <UpdateTechnologyCategoryForm
                        category={activeCategory}
                        categories={parentCategories}
                        onClose={closeModal}
                    />
                ) : (
                    <CreateTechnologyCategoryForm
                        categories={parentCategories}
                        onClose={closeModal}
                    />
                )}
            </Modal>

            <div className="space-y-6 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Категории технологий
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Управление иерархией и классификацией
                            технологий радиосвязи
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        Добавить категорию
                    </button>
                </div>

                <form
                    onSubmit={applyFilters}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label
                                htmlFor="search"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Поиск
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="search"
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Название или slug..."
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="parent_id"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Родительская категория
                            </label>

                            <select
                                id="parent_id"
                                value={parentId}
                                onChange={(event) =>
                                    setParentId(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Все категории</option>

                                {parentCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="is_published"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Публикация
                            </label>

                            <select
                                id="is_published"
                                value={isPublished}
                                onChange={(event) =>
                                    setIsPublished(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Все категории</option>
                                <option value="1">Опубликовано</option>
                                <option value="0">Черновик</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <RotateCcw size={15} />
                            Сбросить
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                        >
                            Найти
                        </button>
                    </div>
                </form>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-2 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
                        <h2 className="font-semibold text-gray-900">
                            Список категорий
                        </h2>

                        <p className="text-sm text-gray-500">
                            Всего: {categories.total ?? 0}
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Категория
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Родитель
                                    </th>

                                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Порядок
                                    </th>

                                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Статус
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Действия
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">
                                {categories.data?.length > 0 ? (
                                    categories.data.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {category.name}
                                                </div>

                                                <div className="mt-1 text-xs text-gray-400">
                                                    {category.slug}
                                                </div>

                                                {category.description && (
                                                    <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                                                        {category.description}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {category.parent?.name ?? '—'}
                                            </td>

                                            <td className="px-5 py-4 text-center text-sm text-gray-600">
                                                {category.sort_order}
                                            </td>

                                            <td className="px-5 py-4 text-center">
                                                <PublicationBadge
                                                    isPublished={category.is_published}
                                                />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openUpdateModal(category)
                                                        }
                                                        title="Редактировать"
                                                        className="inline-flex items-center justify-center rounded border border-amber-200 bg-amber-50 p-2 text-amber-600 shadow-sm transition hover:border-amber-300 hover:bg-amber-500 hover:text-white"
                                                    >
                                                        <Pencil size={17} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteCategory(category)
                                                        }
                                                        title="Удалить"
                                                        className="inline-flex items-center justify-center rounded border border-red-200 bg-red-50 p-2 text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-16 text-center"
                                        >
                                            <div className="text-sm font-medium text-gray-700">
                                                Категории не найдены
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Измените параметры поиска или
                                                добавьте новую категорию.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {categories.links?.length > 3 && (
                        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-500">
                                Показано {categories.from ?? 0}–
                                {categories.to ?? 0} из{' '}
                                {categories.total ?? 0}
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {categories.links.map((link, index) => (
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
                                        className={`min-w-9 rounded-lg px-3 py-2 text-sm transition ${
                                            link.active
                                                ? 'bg-indigo-600 font-semibold text-white'
                                                : link.url
                                                  ? 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                  : 'cursor-not-allowed text-gray-300'
                                        }`}
                                    >
                                        {paginationLabel(link.label)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function PublicationBadge({ isPublished }) {
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                isPublished
                    ? 'bg-green-50 text-green-700 ring-green-600/20'
                    : 'bg-amber-50 text-amber-700 ring-amber-600/20'
            }`}
        >
            {isPublished ? 'Опубликовано' : 'Черновик'}
        </span>
    );
}
