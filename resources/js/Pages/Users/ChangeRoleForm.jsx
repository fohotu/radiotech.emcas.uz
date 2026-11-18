
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { swalSuccess, swalError } from '../../Utils/swal';

export default function ChangeRoleForm({ user, onSucess, onError }) {
    const { data, setData, put, processing, errors } = useForm({
        role: user.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/admin/users/${user.id}/update-role`, {
            preserveScroll: true,
            onSuccess: () => onSucess('User role updated'),
            onError: () => onError('Error updating user role'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    User Role
                </label>

                <select
                    value={data.role}
                    onChange={e => setData('role', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm"
                >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>

                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Save size={16} />
                    {processing ? 'Saving...' : 'Update Role'}
                </button>
            </div>
        </form>
    );
}
