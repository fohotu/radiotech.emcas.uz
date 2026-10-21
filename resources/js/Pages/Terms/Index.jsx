
import { Head, Link, router } from '@inertiajs/react';
import { Search, Plus, Eye, Pencil, ChevronLeft, ChevronRight,Trash } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import CreateTermForm from './CreateTermForm';
import UpdateTermForm from './UpdateTermForm';
import {swalConfirm,swalSuccess,swalError } from '../../Utils/swal';

const statuses = {
    draft: 'Черновик',
    published: 'Опубликован',
    archived: 'В архиве',
};

const statusStyles = {
    draft: 'bg-gray-100 text-gray-700',
    published: 'bg-green-100 text-green-700',
    archived: 'bg-amber-100 text-amber-700',
};

export default function Index({ terms, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTerm,setActiveTerm] = useState(null);

    function submitSearch(e) {
        e.preventDefault();

        router.get(
            '/terms',
            { search, status },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function changeStatus(value) {
        setStatus(value);

        router.get(
            '/terms',
            { search, status: value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    const handleDelete = async (termId) => {
        const confirmed = await swalConfirm('Удалить этот термин?', 'Запись будет удалена безвозвратно.');
        if (confirmed) {
            router.delete(`/terms/${termId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    swalSuccess('Термин успешно удален');
                },
                onError: () => {
                    swalError('Ошибка при удалении термина');
                },
            });
        }
    };

    const items = terms.data ?? [];
    const links = terms.links ?? [];

    return (
        <>
            <Head title="Термины" />

            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Добавить термин"
            >
                {
                    activeTerm ?
                        <UpdateTermForm
                            term={activeTerm}
                            onClose={() => {
                                setActiveTerm(null);
                                setIsModalOpen(false)
                            }}
                        />  
                    :
                    <CreateTermForm 
                        onClose={() => setIsModalOpen(false)}
                    />
                }
               
            </Modal>
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Термины
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Управление терминологическим справочником
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} />
                            Добавить термин
                        </button>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <form
                            onSubmit={submitSearch}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Поиск терминов..."
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(e) => changeStatus(e.target.value)}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Все статусы</option>
                                <option value="draft">Черновик</option>
                                <option value="published">Опубликован</option>
                                <option value="archived">В архиве</option>
                            </select>

                            <button
                                type="submit"
                                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                            >
                                Найти
                            </button>
                        </form>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                            <h2 className="font-semibold text-gray-900">
                                Список терминов
                            </h2>
                            <span className="text-sm text-gray-500">
                                Всего: {terms.total ?? items.length}
                            </span>
                        </div>

                        {items.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                            <tr>
                                                <th className="px-5 py-3 font-medium">Термин</th>
                                                <th className="px-5 py-3 font-medium">Статус</th>
                                                <th className="px-5 py-3 font-medium">Просмотры</th>
                                                <th className="px-5 py-3 font-medium">Дата создания</th>
                                                <th className="px-5 py-3 text-right font-medium">Действия</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {items.map((term) => {
                                                const translation = term.translations?.[0];

                                                return (
                                                    <tr
                                                        key={term.id}
                                                        className="transition hover:bg-gray-50"
                                                    >
                                                        <td className="px-5 py-4">
                                                            <div className="font-medium text-gray-900">
                                                                {translation?.title ?? 'Без названия'}
                                                            </div>
                                                            {translation?.description && (
                                                                <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                                                                    {translation.description}
                                                                </p>
                                                            )}
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                                    statusStyles[term.status] ??
                                                                    'bg-gray-100 text-gray-700'
                                                                }`}
                                                            >
                                                                {statuses[term.status] ?? term.status}
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4 text-gray-600">
                                                            {term.view_count ?? 0}
                                                        </td>

                                                        <td className="px-5 py-4 whitespace-nowrap text-gray-500">
                                                            {term.created_at
                                                                ? new Date(term.created_at).toLocaleDateString('ru-RU')
                                                                : '—'}
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <div className="flex justify-end gap-2">
                                                                <Link
                                                                    href={`/terms/show/${term.id}`}
                                                                    title="Просмотреть"
                                                                    className="inline-flex items-center justify-center rounded border border-blue-200 bg-blue-50 p-2 text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-600 hover:text-white hover:shadow-md active:scale-95"
                                                                >
                                                                    <Eye size={17} />
                                                                </Link>
                                                                <button
                                                                    onClick={()=>{
                                                                        setActiveTerm(term);
                                                                        setIsModalOpen(true);
                                                                    }}
                                                                    title="Редактировать"
                                                                    className="inline-flex items-center justify-center rounded border border-amber-200 bg-amber-50 p-2 text-amber-600 shadow-sm transition-all duration-200 hover:border-amber-300 hover:bg-amber-500 hover:text-white hover:shadow-md active:scale-95"
                                                                >
                                                                    <Pencil size={17} />
                                                                </button>

                                                                <button
                                                                    onClick={()=>handleDelete(term.id)}
                                                                    title="Редактировать"
                                                                    className="inline-flex items-center justify-center rounded border border-red-200 bg-red-50 p-2 text-amber-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-500 hover:text-white hover:shadow-md active:scale-95"
                                                                >
                                                                    <Trash size={17} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {links.length > 0 && (
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4">
                                        <p className="text-sm text-gray-500">
                                            Показано {terms.from ?? 0}–{terms.to ?? 0} из {terms.total ?? 0}
                                        </p>

                                        <div className="flex flex-wrap gap-1">
                                            {links.map((link, index) => {
                                                const label = link.label
                                                    .replace('&laquo;', '')
                                                    .replace('&raquo;', '');

                                                return (
                                                    <button
                                                        key={index}
                                                        disabled={!link.url || link.active}
                                                        onClick={() => link.url && router.visit(link.url)}
                                                        className={`rounded-md border px-3 py-2 text-sm ${
                                                            link.active
                                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                        } disabled:cursor-not-allowed disabled:opacity-40`}
                                                    >
                                                        {label.includes('Previous') ? (
                                                            <ChevronLeft size={16} />
                                                        ) : label.includes('Next') ? (
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
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                    <Search size={22} />
                                </div>
                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Термины не найдены
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Измените параметры поиска или добавьте новый термин.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
