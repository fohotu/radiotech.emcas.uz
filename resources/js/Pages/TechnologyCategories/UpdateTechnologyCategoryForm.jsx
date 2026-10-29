
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { swalError, swalSuccess } from '../../Utils/swal';

const locales = [
    { code: 'ru', label: 'Русский' },
    { code: 'uz', label: 'Ўзбекча' },
    { code: 'en', label: 'English' },
];

const emptyTranslations = () => ({
    ru: { name: '', description: '' },
    uz: { name: '', description: '' },
    en: { name: '', description: '' },
});

const normalizeTranslations = (translations = []) => {
    const result = emptyTranslations();

    const entries = Array.isArray(translations)
        ? translations.map((translation) => [
              translation.locale,
              translation,
          ])
        : Object.entries(translations ?? {});

    entries.forEach(([locale, translation]) => {
        if (result[locale]) {
            result[locale] = {
                name: translation?.name ?? '',
                description: translation?.description ?? '',
            };
        }
    });

    return result;
};

export default function UpdateTechnologyCategoryForm({
    category,
    categories = [],
    onClose = () => {},
}) {
    const [activeLocale, setActiveLocale] = useState('ru');

    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        parent_id: category.parent_id?.toString() ?? '',
        slug: category.slug ?? '',
        name: category.name ?? '',
        description: category.description ?? '',
        sort_order: category.sort_order ?? 0,
        is_published: Boolean(category.is_published),
        translations: normalizeTranslations(category.translations),
    });

    const updateTranslation = (locale, field, value) => {
        setData('translations', {
            ...data.translations,
            [locale]: {
                ...data.translations[locale],
                [field]: value,
            },
        });
    };

    const activeTranslation = data.translations[activeLocale];

    const translationError = (field) =>
        errors[`translations.${activeLocale}.${field}`];

    const availableParents = categories.filter(
        (item) => Number(item.id) !== Number(category.id),
    );

    const submit = (event) => {
        event.preventDefault();

        put(`/technology-categories/${category.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                reset();
                onClose();
                swalSuccess('Категория успешно обновлена');
            },

            onError: () => {
                swalError('Не удалось обновить категорию');
            },
        });
    };

    return (
        <>
            <Head title="Редактировать категорию технологий" />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Редактировать категорию
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Измените основную информацию, иерархию и переводы.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                    <div className="space-y-8 p-6">
                        <section className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Основная информация
                            </h2>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="parent_id"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Родительская категория
                                    </label>

                                    <select
                                        id="parent_id"
                                        value={data.parent_id}
                                        onChange={(event) =>
                                            setData('parent_id', event.target.value)
                                        }
                                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.parent_id
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    >
                                        <option value="">
                                            Без родительской категории
                                        </option>

                                        {availableParents.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.parent_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.parent_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="slug"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Slug *
                                    </label>

                                    <input
                                        id="slug"
                                        type="text"
                                        required
                                        value={data.slug}
                                        onChange={(event) =>
                                            setData('slug', event.target.value)
                                        }
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.slug
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    />

                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Основное название *
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.name
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    />

                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="sort_order"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Порядок сортировки
                                    </label>

                                    <input
                                        id="sort_order"
                                        type="number"
                                        min="0"
                                        value={data.sort_order}
                                        onChange={(event) =>
                                            setData(
                                                'sort_order',
                                                event.target.value,
                                            )
                                        }
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.sort_order
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    />

                                    {errors.sort_order && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.sort_order}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Основное описание
                                </label>

                                <textarea
                                    id="description"
                                    rows={3}
                                    value={data.description}
                                    onChange={(event) =>
                                        setData('description', event.target.value)
                                    }
                                    className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                        errors.description
                                            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                    }`}
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={Boolean(data.is_published)}
                                    onChange={(event) =>
                                        setData(
                                            'is_published',
                                            event.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />

                                <span className="text-sm font-medium text-gray-700">
                                    Опубликовано
                                </span>
                            </label>

                            {errors.is_published && (
                                <p className="text-sm text-red-600">
                                    {errors.is_published}
                                </p>
                            )}
                        </section>

                        <section className="space-y-5">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Переводы
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Редактирование названия и описания для каждого языка.
                                </p>
                            </div>

                            <div
                                className="flex flex-wrap gap-2 border-b border-gray-200"
                                role="tablist"
                                aria-label="Язык перевода"
                            >
                                {locales.map((locale) => {
                                    const translation =
                                        data.translations[locale.code];

                                    const isActive =
                                        activeLocale === locale.code;

                                    const hasName = Boolean(
                                        translation?.name.trim(),
                                    );

                                    const hasError = Boolean(
                                        errors[`translations.${locale.code}.name`] ||
                                        errors[`translations.${locale.code}.description`],
                                    );

                                    return (
                                        <button
                                            key={locale.code}
                                            type="button"
                                            role="tab"
                                            id={`tab-${locale.code}`}
                                            aria-selected={isActive}
                                            aria-controls={`panel-${locale.code}`}
                                            onClick={() =>
                                                setActiveLocale(locale.code)
                                            }
                                            className={`relative -mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                                                isActive
                                                    ? 'border-indigo-600 text-indigo-600'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }`}
                                        >
                                            {locale.label}

                                            {hasName && (
                                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                            )}

                                            {hasError && (
                                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div
                                id={`panel-${activeLocale}`}
                                role="tabpanel"
                                aria-labelledby={`tab-${activeLocale}`}
                                className="space-y-5"
                            >
                                <div>
                                    <label
                                        htmlFor={`translation-name-${activeLocale}`}
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Название
                                    </label>

                                    <input
                                        id={`translation-name-${activeLocale}`}
                                        type="text"
                                        value={activeTranslation?.name ?? ''}
                                        onChange={(event) =>
                                            updateTranslation(
                                                activeLocale,
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            translationError('name')
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    />

                                    {translationError('name') && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {translationError('name')}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor={`translation-description-${activeLocale}`}
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Описание
                                    </label>

                                    <textarea
                                        id={`translation-description-${activeLocale}`}
                                        rows={4}
                                        value={activeTranslation?.description ?? ''}
                                        onChange={(event) =>
                                            updateTranslation(
                                                activeLocale,
                                                'description',
                                                event.target.value,
                                            )
                                        }
                                        className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            translationError('description')
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    />

                                    {translationError('description') && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {translationError('description')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {errors.translations && (
                                <p className="text-sm text-red-600">
                                    {errors.translations}
                                </p>
                            )}
                        </section>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Отмена
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing
                                ? 'Сохранение...'
                                : 'Сохранить изменения'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
