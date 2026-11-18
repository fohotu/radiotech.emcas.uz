
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { swalSuccess, swalError } from '../../Utils/swal';

export default function ChangePasswordForm({ user, onSucess, onError }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/admin/users/${user.id}/update-password`, {
            preserveScroll: true,
            onSuccess: () => onSucess("Password updated successfully"), 
            onError: () => onError("Error updating password"),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    New Password
                </label>
                <input
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    autoComplete="new-password"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Minimum 8 characters"
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                </label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    autoComplete="new-password"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Repeat new password"
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing || !data.password}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Save size={16} />
                    {processing ? 'Saving...' : 'Update Password'}
                </button>
            </div>
        </form>
    );
}
