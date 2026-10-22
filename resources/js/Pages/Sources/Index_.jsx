
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Library, Search, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import PublicLayout from '../../Components/PublicLayout';

const sources = [
    {
        id: 1,
        title: 'Регламент радиосвязи',
        organization: 'Международный союз электросвязи (ITU)',
        type: 'Международный регламент',
        edition: 'Редакция для проверки',
        description: 'Основной источник определений и терминов, применяемых в международном регулировании радиосвязи.',
        termsCount: 420,
        reference: 'RR',
        url: 'https://www.itu.int/',
    },
    {
        id: 2,
        title: 'Рекомендации ITU-R',
        organization: 'Сектор радиосвязи ITU',
        type: 'Рекомендации',
        edition: 'Различные редакции',
        description: 'Технические рекомендации по радиосвязи, управлению спектром и характеристикам систем.',
        termsCount: 284,
        reference: 'ITU-R',
        url: 'https://www.itu.int/rec/R-REC/en',
    },
    {
        id: 3,
        title: 'Словарь телекоммуникационных терминов',
        organization: 'Технический справочник',
        type: 'Справочный материал',
        edition: 'Демонстрационная запись',
        description: 'Дополнительные определения для понятий, используемых в телекоммуникациях и технических документах.',
        termsCount: 156,
        reference: 'TECH-DICT',
        url: null,
    },
];

export default function Index() {
    const [query, setQuery] = useState('');

    const filtered = sources.filter((item) =>
        `${item.title} ${item.organization} ${item.type} ${item.reference}`
            .toLowerCase()
            .includes(query.toLowerCase()),
    );

    return (
        <PublicLayout
            title="Источники"
            description="Документы, регламенты, стандарты и справочные материалы, на которые опираются определения терминов."
        >
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Источников в каталоге', value: '156' },
                        { label: 'Основных типов', value: '4' },
                        { label: 'Языков публикаций', value: '3' },
                    ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                            <p className="text-sm text-slate-500">{item.label}</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Каталог источников</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Каждый термин должен быть связан с конкретным источником и редакцией.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                        <Search size={18} className="text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Найти источник..."
                            className="w-full border-0 py-3 text-sm focus:ring-0 sm:w-64"
                        />
                    </div>
                </div>

                <div className="mt-5 grid gap-4">
                    {filtered.map((item) => (
                        <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <FileText size={23} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-slate-400">{item.reference}</span>
                                    </div>

                                    <h3 className="mt-3 text-lg font-bold text-slate-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-blue-700">{item.organization}</p>
                                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                                        {item.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                                            <span>Редакция: {item.edition}</span>
                                            <span>{item.termsCount} связанных терминов</span>
                                        </div>

                                        {item.url ? (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                                            >
                                                Официальный сайт <ExternalLink size={15} />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-amber-700">
                                                Демонстрационный источник
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}

                    {filtered.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                            <Library className="mx-auto text-slate-300" size={35} />
                            <p className="mt-3 font-semibold text-slate-800">Источники не найдены</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                    <h3 className="font-semibold text-blue-900">Принцип работы с источниками</h3>
                    <p className="mt-2 text-sm leading-6 text-blue-800">
                        В рабочей системе для каждого определения следует хранить точное название
                        документа, номер, редакцию, статью или пункт, страницу и ссылку на первоисточник.
                    </p>
                    <Link href="/terms" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-800">
                        Перейти к терминам <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
