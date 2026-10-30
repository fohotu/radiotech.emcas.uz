import { useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import {swalSuccess,swalError } from '../../Utils/swal';

export default function UpdateUserForm({ user, onClose }) {
    
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/users/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                swalSuccess('Source Created successfully');
            },
            onError: () => {
                swalError('Error Create Source');
            },
        });

    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Update User
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Update user information and permissions.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter full name"
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm
                            outline-none focus:ring-2 focus:ring-indigo-500
                            ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="example@email.com"
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm
                            outline-none focus:ring-2 focus:ring-indigo-500
                            ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        New Password
                    </label>

                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Leave empty to keep current password"
                        autoComplete="new-password"
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm
                            outline-none focus:ring-2 focus:ring-indigo-500
                            ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Role <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm
                            bg-white outline-none focus:ring-2 focus:ring-indigo-500
                            ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="user">User</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                    </select>

                    {errors.role && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.role}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-4 py-2.5
                            border border-gray-300 rounded-lg text-sm font-medium
                            text-gray-700 hover:bg-gray-50 transition"
                    >
                        <X size={16} />
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-4 py-2.5
                            bg-indigo-600 text-white rounded-lg text-sm font-medium
                            hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                        <Save size={16} />
                        {processing ? 'Updating...' : 'Update User'}
                    </button>
                </div>
            </form>
        </div>
    );
}