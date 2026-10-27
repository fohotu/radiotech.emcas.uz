
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import CreateTechnologyForm from './CreateTechnologyForm';
import UpdateTechnologyForm from './UpdateTechnologyForm';
import Modal from '@/Components/Modal';
import { Search, Plus, Eye, Pencil, ChevronLeft, ChevronRight,Trash } from 'lucide-react';


export default function Index({ technologies, categories, filters }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [categoryId, setCategoryId] = useState(filters.category_id ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTechnology,setActiveTechnology] = useState(null);

    useEffect(() => {
        setSearch(filters.search ?? '');
        setCategoryId(filters.category_id ?? '');
        setStatus(filters.status ?? '');
    }, [filters]);

    const applyFilters = (e) => {
        e.preventDefault();

        router.get(
            'technologies',
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

    const resetFilters = () => {
        
        setSearch('');
        setCategoryId('');
        setStatus('');

        router.get('technologies', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });


    };

    const paginationLabel = (label) => {
        if (label.includes('Previous')) return '← Назад';
        if (label.includes('Next')) return 'Вперёд →';

        return label.replace(/&laquo;|&raquo;/g, '');
    };



    const deleteTechnology = (technology) => {
        if (!confirm(`Delete technology "${technology.name}"?`)) {
            return;
        }

        router.delete(`/technologies/${technology.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Технологии радиосвязи" />

             <Modal
                            show={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title="Добавить термин"
                        >
                            {
                                activeTechnology ?
                                    <UpdateTechnologyForm
                                        technology={activeTechnology}
                                        onClose={() => {
                                            setActiveTechnology(null);
                                            setIsModalOpen(false)
                                        }}
                                        categories={categories}
                                    />  
                                :
                                <CreateTechnologyForm 
                                    onClose={() => setIsModalOpen(false)}
                                    categories={categories}
                                />
                            }
                           
                        </Modal>

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Технологии радиосвязи
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Управление технологиями и их классификацией
                        </p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={18} />
                        Добавить технологию
                    </button> 
                  
                </div>

                {/* Filters */}
                <form
                    onSubmit={applyFilters}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <label
                                htmlFor="search"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Поиск
                            </label>
                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Название, обозначение или сокращение..."
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="category_id"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Категория
                            </label>
                            <select
                                id="category_id"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Все категории</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Статус
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Все статусы</option>
                                <option value="draft">Черновик</option>
                                <option value="published">Опубликовано</option>
                                <option value="archived">В архиве</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
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

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-2 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
                        <h2 className="font-semibold text-gray-900">
                            Список технологий
                        </h2>
                        <p className="text-sm text-gray-500">
                            Всего: {technologies.total ?? 0}
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Технология
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Категория
                                    </th>
                                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Термины
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Статус
                                    </th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Действия
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">
                                {technologies.data.length > 0 ? (
                                    technologies.data.map((technology) => (
                                        <tr
                                            key={technology.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {technology.name}
                                                </div>

                                                {technology.abbreviation && (
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        {technology.abbreviation}
                                                    </div>
                                                )}

                                                {technology.slug && (
                                                    <div className="mt-1 text-xs text-gray-400">
                                                        {technology.slug}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {technology.category?.name ?? '—'}
                                            </td>

                                            <td className="px-5 py-4 text-center">
                                                <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700">
                                                    {technology.terms_count ?? 0}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge status={technology.status} />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => 
                                                            {
                                                                setActiveTechnology(technology);
                                                                setIsModalOpen(true);
                                                            }
                                                        }
                                                          className="inline-flex items-center justify-center rounded border border-amber-200 bg-amber-50 p-2 text-amber-600 shadow-sm transition-all duration-200 hover:border-amber-300 hover:bg-amber-500 hover:text-white hover:shadow-md active:scale-95"
                                                    >
                                                        <Pencil size={17} />
                                                    </button>
                                                     <button
                                                        onClick={()=>deleteTechnology(technology)}
                                                           className="inline-flex items-center justify-center rounded border border-red-200 bg-red-50 p-2 text-amber-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-500 hover:text-white hover:shadow-md active:scale-95"
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
                                            colSpan="5"
                                            className="px-5 py-16 text-center"
                                        >
                                            <div className="text-sm font-medium text-gray-700">
                                                Технологии не найдены
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Измените параметры поиска или добавьте новую технологию.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {technologies.links?.length > 3 && (
                        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-500">
                                Показано {technologies.from ?? 0}–{technologies.to ?? 0}
                                {' '}из {technologies.total ?? 0}
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {technologies.links.map((link, index) => (
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

function StatusBadge({ status }) {
    const styles = {
        draft: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        published: 'bg-green-50 text-green-700 ring-green-600/20',
        archived: 'bg-gray-100 text-gray-600 ring-gray-500/20',
    };

    const labels = {
        draft: 'Черновик',
        published: 'Опубликовано',
        archived: 'В архиве',
    };

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                styles[status] ?? styles.draft
            }`}
        >
            {labels[status] ?? status ?? '—'}
        </span>
    );
}
