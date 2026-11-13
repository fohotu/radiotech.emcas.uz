
import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Plus,
    Eye,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Trash2,
    FileText,
    X,
} from 'lucide-react';
import { useState } from 'react';

import Modal from '@/Components/Modal';
import CreateTermForm from './CreateTermForm';
import UpdateTermForm from './UpdateTermForm';
import {
    swalConfirm,
    swalSuccess,
    swalError,
} from '@/Utils/swal';

import AdminLayout from '@/Layouts/AdminLayout';

const statuses = {
    draft: 'Черновик',
    published: 'Опубликован',
    archived: 'В архиве',
};

const statusStyles = {
    draft: 'bg-slate-100 text-slate-600 ring-slate-200',
    published: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    archived: 'bg-amber-50 text-amber-700 ring-amber-200',
};

export default function Index({ terms, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTerm, setActiveTerm] = useState(null);

    const items = terms?.data ?? [];
    const links = terms?.links ?? [];

    function submitSearch(e) {
        e.preventDefault();

        router.get(
            '/terms',
            { search, status },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function changeStatus(value) {
        setStatus(value);

        router.get(
            '/terms',
            { search, status: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function openCreateModal() {
        setActiveTerm(null);
        setIsModalOpen(true);
    }

    function openEditModal(term) {
        setActiveTerm(term);
        setIsModalOpen(true);
    }

    function closeModal() {
        setActiveTerm(null);
        setIsModalOpen(false);
    }

    function clearFilters() {
        setSearch('');
        setStatus('');

        router.get(
            '/terms',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    const handleDelete = async (termId) => {
        const confirmed = await swalConfirm(
            'Удалить этот термин?',
            'Запись будет удалена безвозвратно.',
        );

        if (!confirmed) return;

        router.delete(`/terms/${termId}`, {
            preserveScroll: true,
            onSuccess: () => swalSuccess('Термин успешно удален'),
            onError: () => swalError('Ошибка при удалении термина'),
        });
    };

    return (
        <AdminLayout title="Термины и определения">
            <Head title="Термины и определения" />

            <div className="mx-auto w-full max-w-[1600px] space-y-6">

                {/* Page heading */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Справочник</span>
                            <span>/</span>
                            <span className="text-indigo-600">Термины</span>
                        </div>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Термины и определения
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Управление терминологическим справочником и переводами
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                       className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100"
                    >
                        <Plus size={18} strokeWidth={2.3} />
                        Добавить термин
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100/70">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <FileText size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Всего терминов
                            </p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                {terms?.total ?? items.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100/70">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <FileText size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Опубликованные
                            </p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                {terms?.published_count ?? '—'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100/70">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <FileText size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Черновики
                            </p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                {terms?.draft_count ?? '—'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main table card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/40">

                    {/* Table header */}
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Список терминов
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Все термины терминологического справочника
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                            <span className="size-2 rounded-full bg-indigo-500" />
                            {terms?.total ?? items.length} записей
                        </span>
                    </div>

                    {/* Search and filters */}
                    <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">
                        <form
                            onSubmit={submitSearch}
                            className="flex flex-col gap-3 lg:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Поиск по названию термина..."
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(e) => changeStatus(e.target.value)}
                                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 lg:w-52"
                            >
                                <option value="">Все статусы</option>
                                <option value="draft">Черновик</option>
                                <option value="published">Опубликован</option>
                                <option value="archived">В архиве</option>
                            </select>

                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                <Search size={16} />
                                Найти
                            </button>

                            {(search || status) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                                >
                                    <X size={16} />
                                    Сбросить
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Table */}
                    {items.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[850px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-white">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Термин
                                            </th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Статус
                                            </th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Просмотры
                                            </th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Дата создания
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Действия
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {items.map((term) => {
                                            const translation = term.translations?.[0];

                                            return (
                                                <tr
                                                    key={term.id}
                                                    className="group transition-colors hover:bg-slate-50/80"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-slate-800 transition group-hover:text-indigo-700">
                                                            {translation?.title ?? 'Без названия'}
                                                        </div>

                                                        {translation?.description && (
                                                            <p className="mt-1 max-w-md truncate text-xs leading-5 text-slate-400">
                                                                {translation.description}
                                                            </p>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                                                                statusStyles[term.status] ??
                                                                'bg-slate-100 text-slate-600 ring-slate-200'
                                                            }`}
                                                        >
                                                            <span className="size-1.5 rounded-full bg-current" />
                                                            {statuses[term.status] ?? term.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="font-medium tabular-nums text-slate-600">
                                                            {(term.view_count ?? 0).toLocaleString('ru-RU')}
                                                        </span>
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                                                        {term.created_at
                                                            ? new Date(term.created_at).toLocaleDateString('ru-RU')
                                                            : '—'}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-1.5">
                                                            <Link
                                                                href={`/terms/show/${term.id}`}
                                                                title="Просмотреть"
                                                                className="inline-flex size-9 items-center justify-center rounded text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                            >
                                                                <Eye size={17} />
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(term)}
                                                                title="Редактировать"
                                                                className="inline-flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                                                            >
                                                                <Pencil size={17} />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(term.id)}
                                                                title="Удалить"
                                                                className="
                                                                        flex size-9 items-center justify-center
                                                                        rounded-lg
                                                                        border border-transparent
                                                                        text-slate-400
                                                                        transition-all duration-200
                                                                        hover:border-red-100
                                                                        hover:bg-red-50
                                                                        hover:text-red-600
                                                                    "
                                                            >
                                                                <Trash2 size={17} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {links.length > 0 && (
                                <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                                    <p className="text-sm text-slate-500">
                                        Показано{' '}
                                        <span className="font-semibold text-slate-700">
                                            {terms?.from ?? 0}–{terms?.to ?? 0}
                                        </span>
                                        {' '}из{' '}
                                        <span className="font-semibold text-slate-700">
                                            {terms?.total ?? 0}
                                        </span>
                                    </p>

                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {links.map((link, index) => {
                                            const label = link.label
                                                .replace('&laquo;', '')
                                                .replace('&raquo;', '');

                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    disabled={!link.url || link.active}
                                                    onClick={() => {
                                                        if (link.url) {
                                                            router.visit(link.url, {
                                                                preserveScroll: true,
                                                            });
                                                        }
                                                    }}
                                                    className={`inline-flex min-w-9 h-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
                                                        link.active
                                                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600'
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
                        <div className="flex flex-col items-center px-6 py-20 text-center">
                            <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <FileText size={28} strokeWidth={1.5} />
                            </div>

                            <h3 className="mt-5 text-base font-semibold text-slate-800">
                                Термины не найдены
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                По заданным параметрам ничего не найдено.
                                Попробуйте изменить запрос или добавьте новый термин.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Update modal */}
            <Modal
                show={isModalOpen}
                onClose={closeModal}
                title={activeTerm ? 'Редактировать термин' : 'Добавить термин'}
            >
                {activeTerm ? (
                    <UpdateTermForm
                        term={activeTerm}
                        onClose={closeModal}
                    />
                ) : (
                    <CreateTermForm
                        onClose={closeModal}
                    />
                )}
            </Modal>
        </AdminLayout>
    );
}
