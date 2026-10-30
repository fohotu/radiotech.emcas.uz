import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import CreateUserForm from './CreateUserForm';
import UpdateUserForm from './UpdateUserForm';
import Modal from '@/Components/Modal';

import {
    Search,
    Plus,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Trash,
    Users,
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

    const handleDelete = (user) => {
        if (!window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
            return;
        }

        router.delete(`/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedUser(null);
    };

    const getRoleBadge = (role) => {
        
        const styles = {
            admin: 'bg-purple-100 text-purple-700',
            editor: 'bg-blue-100 text-blue-700',
            user: 'bg-gray-100 text-gray-700',
        };

        return styles[role] || 'bg-gray-100 text-gray-700';
    
    };

    return (
        <>
            <Head title="Users" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Users
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage system users and their roles.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5
                            bg-indigo-600 text-white text-sm font-medium rounded-lg
                            hover:bg-indigo-700 transition"
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300
                                    rounded-lg text-sm focus:ring-2 focus:ring-indigo-500
                                    focus:border-indigo-500 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-indigo-600 text-white text-sm
                                font-medium rounded-lg hover:bg-indigo-700 transition"
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            onClick={resetSearch}
                            className="px-5 py-2.5 border border-gray-300 text-gray-700
                                text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                        >
                            Reset
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                    <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users size={19} className="text-gray-500" />

                            <h2 className="font-semibold text-gray-900">
                                Users List
                            </h2>
                        </div>

                        <span className="text-sm text-gray-500">
                            Total: {users.total}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="px-5 py-4 font-medium">#</th>
                                    <th className="px-5 py-4 font-medium">Name</th>
                                    <th className="px-5 py-4 font-medium">Email</th>
                                    <th className="px-5 py-4 font-medium">Role</th>
                                    <th className="px-5 py-4 font-medium">Created At</th>
                                    <th className="px-5 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {users.data.length > 0 ? (
                                    users.data.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-5 py-4 text-gray-500">
                                                {users.from + index}
                                            </td>

                                            <td className="px-5 py-4 font-medium text-gray-900">
                                                {user.name}
                                            </td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {user.email}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex px-2.5 py-1 rounded-full
                                                        text-xs font-medium capitalize
                                                        ${getRoleBadge(user.role)}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-gray-500">
                                                {user.created_at
                                                    ? new Date(user.created_at).toLocaleDateString()
                                                    : '-'}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openUpdateModal(user)}
                                                        title="Edit"
                                                        className="w-8 h-8 inline-flex items-center
                                                            justify-center rounded-md text-indigo-600
                                                            bg-indigo-50 hover:bg-indigo-100 transition"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user)}
                                                        title="Delete"
                                                        className="w-8 h-8 inline-flex items-center
                                                            justify-center rounded-md text-red-600
                                                            bg-red-50 hover:bg-red-100 transition"
                                                    >
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-5 py-12 text-center text-gray-500"
                                        >
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.last_page > 1 && (
                        <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row
                            items-center justify-between gap-4">

                            <p className="text-sm text-gray-500">
                                Showing {users.from} to {users.to} of {users.total} results
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
                                            className={`min-w-9 h-9 px-3 flex items-center justify-center
                                                rounded-lg text-sm transition
                                                ${link.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }
                                                disabled:opacity-40 disabled:cursor-not-allowed`}
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
        </>
    );
}