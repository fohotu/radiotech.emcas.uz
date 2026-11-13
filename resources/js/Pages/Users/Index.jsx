
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';

import CreateUserForm from './CreateUserForm';
import UpdateUserForm from './UpdateUserForm';

import {
    Search,
    Plus,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Trash2,
    Users,
    Lock,
    UserLock,
    UsersRound,
    RotateCcw,
} from 'lucide-react';

export default function Index({ users, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            '/users',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const resetSearch = () => {
        setSearch('');

        router.get(
            '/users',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const openUpdateModal = (user) => {
        setSelectedUser(user);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedUser(null);
    };

    const handleDelete = (user) => {
        if (!window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
            return;
        }

        router.delete(`/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    const getRoleBadge = (role) => {
        const styles = {
            admin: 'bg-purple-50 text-purple-700 ring-purple-200',
            editor: 'bg-blue-50 text-blue-700 ring-blue-200',
            user: 'bg-slate-100 text-slate-600 ring-slate-200',
        };

        return styles[role] || 'bg-slate-100 text-slate-600 ring-slate-200';
    };

    const userItems = users?.data ?? [];

    return (
        <AdminLayout title="Пользователи">
            <Head title="Пользователи" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 text-xs font-medium text-slate-400">
                            Управление системой / Пользователи
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Пользователи
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Управление пользователями системы и их ролями.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg
                            bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white
                            shadow-sm transition hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        Добавить пользователя
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Всего пользователей
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {users?.total ?? 0}
                                </p>
                            </div>

                            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                                <Users size={22} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Администраторы
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {users?.data?.filter(user => user.role === 'admin').length ?? 0}
                                </p>
                            </div>

                            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                                <Lock size={22} />
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
                                    {userItems.length}
                                </p>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <UsersRound size={22} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col gap-3 sm:flex-row"
                    >
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Поиск по имени или email..."
                                className="w-full rounded-lg border border-slate-200 bg-white
                                    py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none
                                    transition placeholder:text-slate-400
                                    focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg
                                bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white
                                transition hover:bg-indigo-700"
                        >
                            <Search size={16} />
                            Поиск
                        </button>

                        <button
                            type="button"
                            onClick={resetSearch}
                            className="inline-flex items-center justify-center gap-2 rounded-lg
                                border border-slate-200 px-5 py-2.5 text-sm font-medium
                                text-slate-600 transition hover:bg-slate-50"
                        >
                            <RotateCcw size={15} />
                            Сбросить
                        </button>
                    </form>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <Users size={19} className="text-slate-500" />

                            <h2 className="font-semibold text-slate-900">
                                Список пользователей
                            </h2>
                        </div>

                        <span className="text-sm text-slate-500">
                            Всего: {users?.total ?? 0}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">#</th>
                                    <th className="px-5 py-4 font-semibold">Пользователь</th>
                                    <th className="px-5 py-4 font-semibold">Email</th>
                                    <th className="px-5 py-4 font-semibold">Роль</th>
                                    <th className="px-5 py-4 font-semibold">Дата регистрации</th>
                                    <th className="px-5 py-4 text-right font-semibold">Действия</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {userItems.length > 0 ? (
                                    userItems.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                                                {(users.from ?? 1) + index}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center
                                                        rounded-full bg-indigo-50 text-sm font-semibold
                                                        text-indigo-600">
                                                        {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                                                    </div>

                                                    <span className="font-medium text-slate-800">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                {user.email}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1
                                                        text-xs font-medium capitalize ring-1 ring-inset
                                                        ${getRoleBadge(user.role)}`}
                                                >
                                                    {user.role || 'user'}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                                                {user.created_at
                                                    ? new Date(user.created_at).toLocaleDateString()
                                                    : '-'}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <div className="flex justify-end gap-1.5">

                                                    <button
                                                        type="button"
                                                        onClick={() => openUpdateModal(user)}
                                                        title="Редактировать"
                                                        className="inline-flex h-8 w-8 items-center
                                                            justify-center rounded-lg bg-indigo-50
                                                            text-indigo-600 transition hover:bg-indigo-100"
                                                    >
                                                        <Pencil size={15} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => openUpdateModal(user)}
                                                        title="Управление доступом"
                                                        className="inline-flex h-8 w-8 items-center
                                                            justify-center rounded-lg bg-amber-50
                                                            text-amber-600 transition hover:bg-amber-100"
                                                    >
                                                        <UserLock size={15} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => openUpdateModal(user)}
                                                        title="Управление ролями"
                                                        className="inline-flex h-8 w-8 items-center
                                                            justify-center rounded-lg bg-blue-50
                                                            text-blue-600 transition hover:bg-blue-100"
                                                    >
                                                        <UsersRound size={15} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => openUpdateModal(user)}
                                                        title="Блокировка пользователя"
                                                        className="inline-flex h-8 w-8 items-center
                                                            justify-center rounded-lg bg-orange-50
                                                            text-orange-600 transition hover:bg-orange-100"
                                                    >
                                                        <Lock size={15} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user)}
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
                                        <td
                                            colSpan="6"
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="flex flex-col items-center">
                                                <Users
                                                    size={32}
                                                    className="mb-3 text-slate-300"
                                                />

                                                <p className="font-medium text-slate-600">
                                                    Пользователи не найдены
                                                </p>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    Измените параметры поиска или сбросьте фильтр.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users?.last_page > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4
                            border-t border-slate-100 px-5 py-4 sm:flex-row">

                            <p className="text-sm text-slate-500">
                                Показано {users.from ?? 0}–{users.to ?? 0} из {users.total} пользователей
                            </p>

                            <div className="flex items-center gap-1">
                                {users.links.map((link, index) => {
                                    const isPrevious = index === 0;
                                    const isNext = index === users.links.length - 1;

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url, {
                                                preserveScroll: true,
                                                preserveState: true,
                                            })}
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

            {/* Create Modal */}
            <Modal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <CreateUserForm
                    onClose={() => setShowCreateModal(false)}
                />
            </Modal>

            {/* Update Modal */}
            <Modal
                show={showUpdateModal}
                onClose={closeUpdateModal}
            >
                {selectedUser && (
                    <UpdateUserForm
                        user={selectedUser}
                        onClose={closeUpdateModal}
                    />
                )}
            </Modal>
        </AdminLayout>
    );
}
