
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';


export default function PersonalInfoForm({ user,onSucess, onError }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/admin/users/${user.id}/update-info`, {
            preserveScroll: true,
            onSuccess: () => onSucess("User information updated successfully"), 
            onError: () => onError("Error updating user information"),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Name
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Save size={16} />
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
