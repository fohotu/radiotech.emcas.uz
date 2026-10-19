
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Save } from 'lucide-react';

export default function Edit({ term }) {
    const { data, setData, put, processing, errors } = useForm({
        term: term.term ?? '',
        description: term.description ?? '',
        status: term.status ?? 'active',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/terms/${term.id}`);
    };

    return (
        <>
            <Head title={`Редактирование: ${term.term}`} />

            <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href={'/terms'}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                    >
                        <ArrowLeft size={16} />
                        Назад к терминам
                    </Link>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <BookOpen size={24} />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Редактирование термина
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Измените необходимые данные и сохраните их.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6 px-6 py-7 sm:px-8">
                            <div>
                                <label
                                    htmlFor="term"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Термин <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="term"
                                    type="text"
                                    value={data.term}
                                    onChange={(e) => setData('term', e.target.value)}
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                                        errors.term ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                />

                                {errors.term && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.term}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Описание
                                </label>

                                <textarea
                                    id="description"
                                    rows={5}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Введите определение или описание термина"
                                    className={`w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                                        errors.description ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                />

                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Статус
                                </label>

                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                >
                                    <option value="active">Активный</option>
                                    <option value="inactive">Неактивный</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                                <Link
                                    href={'/terms'}
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Отмена
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={17} />
                                    {processing ? 'Сохранение...' : 'Сохранить изменения'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
