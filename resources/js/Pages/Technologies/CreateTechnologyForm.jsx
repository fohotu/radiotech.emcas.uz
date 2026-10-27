import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const locales = [
    { code: 'ru', label: 'Русский' },
    { code: 'uz', label: 'Ўзбекча' },
    { code: 'en', label: 'English' },
];

export default function CreateTechnologyForm({ categories = [] }) {
    const [activeLocale, setActiveLocale] = useState('ru');

    /*
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        slug: '',
        abbreviation: '',
        status: 'draft',
        translations: locales.map(({ code }) => ({
            locale: code,
            name: '',
            description: '',
        })),
    });
    */


    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: '',
        slug: '',
        abbreviation: '',
        status: 'draft',
        translations: {
            ru: {
                name: '',
                description: '',
            },
            uz: {
                name: '',
                description: '',
            },
            en: {
                name: '',
                description: '',
            },
        },
    });


    /*

    const updateTranslation = (locale, field, value) => {
        setData(
            'translations',
            data.translations.map((translation) =>
                translation.locale === locale
                    ? { ...translation, [field]: value }
                    : translation,
            ),
        );
    };

    */

    const updateTranslation = (locale, field, value) => {
        setData('translations', {
            ...data.translations,
            [locale]: {
                ...data.translations[locale],
                [field]: value,
            },
        });
    };

    /*
    const activeIndex = data.translations.findIndex(
        (translation) => translation.locale === activeLocale,
    );
    */

    /*
    const activeTranslation = data.translations[activeIndex];

    const translationError = (field) =>
        errors[`translations.${activeIndex}.${field}`];
    */

    const activeTranslation = data.translations[activeLocale];

    const translationError = (field) =>
        errors[`translations.${activeLocale}.${field}`];

    const submit1 = (e) => {
        e.preventDefault();
        //console.log(data);
        post('/technologies');
    };


    const submit = (event) => {
            event.preventDefault();
    
            post('/technologies', {
                preserveScroll: true,
                onSuccess: (res) => {
                    reset();
                    setActiveLanguage(null);
                    onClose();
                    swalSuccess('Term created successfully created')
                  
                },
                onError: (err) => {
                    console.log(err)
                   // swalError('Error creating term')
                }
            });
        };

    return (
        <>
            <Head title="Добавить технологию" />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <div>
                    <div className="mb-2 text-sm text-gray-500">
                        <Link
                            href="/technologies"
                            className="hover:text-indigo-600"
                        >
                            Технологии
                        </Link>
                        <span className="mx-2">/</span>
                        <span>Добавление</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Добавить технологию
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Заполните основную информацию и переводы технологии.
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
                                        htmlFor="category_id"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Категория
                                        <span className="text-red-500"> *</span>
                                    </label>

                                    <select
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData('category_id', e.target.value)
                                        }
                                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.category_id
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    >
                                        <option value="">
                                            Выберите категорию
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="status"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Статус
                                        <span className="text-red-500"> *</span>
                                    </label>

                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.status
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    >
                                        <option value="draft">Черновик</option>
                                        <option value="published">
                                            Опубликовано
                                        </option>
                                        <option value="archived">В архиве</option>
                                    </select>

                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="slug"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Slug
                                    </label>

                                    <input
                                        id="slug"
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                        placeholder="cdma2000"
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
                                        htmlFor="abbreviation"
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Сокращение
                                    </label>

                                    <input
                                        id="abbreviation"
                                        type="text"
                                        value={data.abbreviation}
                                        onChange={(e) =>
                                            setData(
                                                'abbreviation',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Например, CDMA"
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                                            errors.abbreviation
                                                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                                        }`}
                                    />

                                    {errors.abbreviation && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.abbreviation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="space-y-5">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Переводы
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Выберите язык, чтобы заполнить его поля.
                                </p>
                            </div>

                            <div
                                className="flex flex-wrap gap-2 border-b border-gray-200"
                                role="tablist"
                                aria-label="Язык перевода"
                            >
                                {locales.map((locale) => {
    const translation = data.translations[locale.code];

    const hasName = Boolean(translation?.name.trim());
    const isActive = activeLocale === locale.code;

    return (
        <button
            key={locale.code}
            type="button"
            role="tab"
            id={`tab-${locale.code}`}
            aria-selected={isActive}
            aria-controls={`panel-${locale.code}`}
            onClick={() => setActiveLocale(locale.code)}
            className={`relative -mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
        >
            {locale.label}

            {hasName && (
                <span
                    className="h-2 w-2 rounded-full bg-green-500"
                    title="Название заполнено"
                />
            )}

            {errors[`translations.${locale.code}.name`] && (
                <span className="h-2 w-2 rounded-full bg-red-500" />
            )}
        </button>
    );
})}
                                {
                                    /*
                                    locales.map((locale, index) => {
                                    const translation = data.translations.find(
                                        (item) => item.locale === locale.code,
                                    );

                                    const hasName = Boolean(
                                        translation?.name.trim(),
                                    );

                                    const isActive =
                                        activeLocale === locale.code;

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
                                                <span
                                                    className="h-2 w-2 rounded-full bg-green-500"
                                                    title="Название заполнено"
                                                />
                                            )}

                                            {errors[
                                                `translations.${index}.name`
                                            ] && (
                                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                            )}
                                        </button>
                                    );
                                })
                                
                                */
                                }
                            </div>

                            <div
                                id={`panel-${activeLocale}`}
                                role="tabpanel"
                                aria-labelledby={`tab-${activeLocale}`}
                                className="space-y-5 rounded-b-lg"
                            >
                                <div>
                                    <label
                                        htmlFor={`name-${activeLocale}`}
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Название
                                    </label>

                                    <input
                                        id={`name-${activeLocale}`}
                                        type="text"
                                        value={activeTranslation?.name ?? ''}
                                        onChange={(e) =>
                                            updateTranslation(
                                                activeLocale,
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder={
                                            activeLocale === 'ru'
                                                ? 'Например, Радиотехнология'
                                                : activeLocale === 'uz'
                                                  ? 'Масалан, Радиотехнология'
                                                  : 'For example, Radio technology'
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
                                        htmlFor={`description-${activeLocale}`}
                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Описание
                                    </label>

                                    <textarea
                                        id={`description-${activeLocale}`}
                                        rows={5}
                                        value={
                                            activeTranslation?.description ?? ''
                                        }
                                        onChange={(e) =>
                                            updateTranslation(
                                                activeLocale,
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Описание технологии и области её применения..."
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
                        <Link
                            href="/technologies"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Отмена
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing
                                ? 'Сохранение...'
                                : 'Создать технологию'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}