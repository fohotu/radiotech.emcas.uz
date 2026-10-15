
import { Link } from '@inertiajs/react';
import { BookOpen, FileText, CheckCircle2, ArrowLeft, ArrowUpRight } from 'lucide-react';
import PublicLayout from '../../Components/PublicLayout';

const terms = [
    {
        id: 1,
        term: 'Радиочастотный спектр',
        en: 'Radio-frequency spectrum',
        uz: 'Radiochastota spektri',
        category: 'Радиочастотный спектр',
        definition: 'Совокупность радиочастот, расположенных в определённом диапазоне и используемых для радиосвязи и других радиотехнологий.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        note: 'Формулировку необходимо сверять с конкретной редакцией официального документа.',
        related: [2, 5],
    },
    {
        id: 2,
        term: 'Полоса частот',
        en: 'Frequency band',
        uz: 'Chastotalar polosasi',
        category: 'Радиочастотный спектр',
        definition: 'Участок радиочастотного спектра, ограниченный двумя заданными частотами.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        note: 'Демонстрационная формулировка.',
        related: [1, 5],
    },
    {
        id: 3,
        term: 'Радиослужба',
        en: 'Radiocommunication service',
        uz: 'Radi aloqa xizmati',
        category: 'Радиосвязь',
        definition: 'Служба, определённая нормативными документами для передачи, излучения и приёма радиоволн.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        note: 'Демонстрационная формулировка.',
        related: [1, 2],
    },
    {
        id: 4,
        term: 'Электромагнитная совместимость',
        en: 'Electromagnetic compatibility',
        uz: 'Elektromagnit moslashuv',
        category: 'Телекоммуникации',
        definition: 'Способность оборудования функционировать в заданной электромагнитной обстановке без недопустимых помех.',
        source: 'Технический словарь',
        sourceCode: 'EMC',
        note: 'Демонстрационная формулировка.',
        related: [3, 5],
    },
    {
        id: 5,
        term: 'Присвоение радиочастоты',
        en: 'Frequency assignment',
        uz: 'Radiochastotani biriktirish',
        category: 'Радиочастотный спектр',
        definition: 'Разрешение на использование радиочастоты или радиочастотного канала в установленных условиях.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        note: 'Демонстрационная формулировка.',
        related: [1, 2],
    },
];

export default function Show({ id = 1 }) {
    const term = terms.find((item) => item.id === Number(id)) ?? terms[0];

    const relatedTerms = terms.filter((item) => term.related.includes(item.id));

    return (
        <PublicLayout
            title="Определение термина"
            description="Определение, переводы, источник и связанные понятия."
        >
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                <Link href="/terms" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700">
                    <ArrowLeft size={17} /> Вернуться к словарю
                </Link>

                <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {term.category}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                    <CheckCircle2 size={14} /> Демо-статус проверки
                                </span>
                            </div>

                            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                                {term.term}
                            </h1>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">English</p>
                                    <p className="mt-2 font-medium text-slate-800">{term.en}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">O‘zbekcha</p>
                                    <p className="mt-2 font-medium text-slate-800">{term.uz}</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-lg font-bold text-slate-900">Определение</h2>
                                <p className="mt-3 text-base leading-8 text-slate-600">
                                    {term.definition}
                                </p>
                            </div>

                            <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                <p className="text-sm font-semibold text-amber-900">
                                    Примечание редактора
                                </p>
                                <p className="mt-1 text-sm leading-6 text-amber-800">
                                    {term.note}
                                </p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <FileText size={22} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900">Источник определения</h2>
                                    <p className="mt-1 text-sm text-slate-500">Нормативная основа</p>
                                </div>
                            </div>

                            <div className="mt-5 rounded-xl border border-slate-200 p-4">
                                <p className="font-semibold text-slate-800">{term.source}</p>
                                <p className="mt-1 text-sm text-slate-500">{term.sourceCode}</p>
                                <p className="mt-3 text-xs leading-5 text-slate-400">
                                    Точные реквизиты и ссылка на редакцию источника будут добавлены в рабочей базе.
                                </p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-slate-900">Связанные термины</h2>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {relatedTerms.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/terms/${item.id}`}
                                        className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50/40"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-800 group-hover:text-blue-700">
                                                {item.term}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">{item.en}</p>
                                        </div>
                                        <ArrowUpRight size={17} className="shrink-0 text-slate-400" />
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-4">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h2 className="font-bold text-slate-900">Карточка термина</h2>
                            <dl className="mt-4 space-y-4 text-sm">
                                <div>
                                    <dt className="text-slate-400">Идентификатор</dt>
                                    <dd className="mt-1 font-medium text-slate-800">RT-{String(term.id).padStart(5, '0')}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400">Категория</dt>
                                    <dd className="mt-1 font-medium text-slate-800">{term.category}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400">Языки</dt>
                                    <dd className="mt-1 font-medium text-slate-800">RU / UZ / EN</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400">Источник</dt>
                                    <dd className="mt-1 font-medium text-slate-800">{term.source}</dd>
                                </div>
                            </dl>
                        </div>

                        <Link href="/terms" className="flex items-center justify-between rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800">
                            <div>
                                <p className="font-semibold">Другие термины</p>
                                <p className="mt-1 text-sm text-slate-300">Вернуться к поиску</p>
                            </div>
                            <BookOpen size={22} />
                        </Link>
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
}
