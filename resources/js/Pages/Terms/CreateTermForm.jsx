import { useState,useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { swalError,swalSuccess } from '../../Utils/swal';
export default function CreateTermForm({ onClose }) {

    const [activeLanguage, setActiveLanguage] = useState('uz');
  
    const { data, setData, post, processing, errors, reset } = useForm({
        status: 'draft',
        translations: {
            ru: {
                title: '',
                description: '',
                definition: '',
                pronunciation: '',
                usage_note: '',
            },
            uz: {
                title: '',
                description: '',
                definition: '',
                pronunciation: '',
                usage_note: '',
            },
            en: {
                title: '',
                description: '',
                definition: '',
                pronunciation: '',
                usage_note: '',
            },
        },
    });


    const languages = [
        { code: 'uz', label: "O‘zbekcha", short: 'UZ' },
        { code: 'ru', label: 'Русский', short: 'RU' },
        { code: 'en', label: 'English', short: 'EN' },
    ];

    const updateTranslation = (language, field, value) => {
        setData('translations', {
            ...data.translations,
            [language]: {
                ...data.translations[language],
                [field]: value,
            },
        });
    };



    const submit = (event) => {
        event.preventDefault();

        post('/terms', {
            preserveScroll: true,
            onSuccess: (res) => {
                reset();
                setActiveLanguage(null);
                onClose();
                swalSuccess('Term created successfully created')
              
            },
            onError: (err) => {
                swalError('Error creating term')
            }
        });
    };

    const inputClass =
        'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

    const renderField = (language, field, label, placeholder, multiline = false) => {
        const errorKey = `translations.${language}.${field}`;

        return (
            <div key={field}>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {label}
                </label>
                {multiline ? (
                    <textarea
                        rows={field === 'definition' ? 4 : 2}
                        value={data.translations[language][field]}
                        onChange={(event) =>
                            updateTranslation(language, field, event.target.value)
                        }
                        placeholder={placeholder}
                        className={inputClass}
                    />
                ) : (
                    <input
                        type="text"
                        value={data.translations[language][field]}
                        onChange={(event) =>
                            updateTranslation(language, field, event.target.value)
                        }
                        placeholder={placeholder}
                        className={inputClass}
                    />
                )}
                {errors[errorKey] && (
                    <p className="mt-1 text-xs text-red-600">
                        {errors[errorKey]}
                    </p>
                )}
            </div>
        );
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Статус термина
                </label>

                {errors.translations && (
    <p className="text-sm text-red-600">
        {errors.translations}
    </p>
)}

                <select
                    value={data.status}
                    onChange={(event) => setData('status', event.target.value)}
                    className={inputClass}
                >
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликован</option>
                    <option value="archived">В архиве</option>
                </select>

                {errors.status && (
                    <p className="mt-1 text-xs text-red-600">{errors.status}</p>
                )}
            </div>

            <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Выберите язык для заполнения
                </h3>

                <div className="grid grid-cols-3 gap-3">
                    {languages.map((language) => {
                        const active = activeLanguage === language.code;
                        const filled = Boolean(
                            data.translations[language.code].title.trim()
                        );

                        return (
                            <button
                                key={language.code}
                                type="button"
                                onClick={() =>
                                    setActiveLanguage(
                                        active ? null : language.code
                                    )
                                }
                                className={`relative flex items-center justify-center gap-2 rounded-xl border px-3 py-4 text-sm font-medium transition ${
                                    active
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-gray-50'
                                }`}
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-700">
                                    {language.short}
                                </span>

                                {language.label}

                                {filled && (
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {activeLanguage && (
                <section className="space-y-4 rounded-xl border border-indigo-100 bg-gray-50/70 p-4">
                    <h3 className="border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                        {languages.find(
                            (language) => language.code === activeLanguage
                        )?.label}
                    </h3>

                    {renderField(
                        activeLanguage,
                        'title',
                        'Название термина *',
                        'Введите название'
                    )}

                    {renderField(
                        activeLanguage,
                        'description',
                        'Краткое описание',
                        'Введите краткое описание',
                        true
                    )}

                    {renderField(
                        activeLanguage,
                        'definition',
                        'Определение',
                        'Введите определение термина',
                        true
                    )}

                    {renderField(
                        activeLanguage,
                        'pronunciation',
                        'Произношение',
                        'Введите произношение'
                    )}

                    {renderField(
                        activeLanguage,
                        'usage_note',
                        'Примечание по использованию',
                        'Дополнительная информация',
                        true
                    )}
                </section>
            )}

            <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <X size={16} />
                    Отмена
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Save size={16} />
                    {processing ? 'Сохранение...' : 'Сохранить термин'}
                </button>
            </div>
        </form>
    );
}