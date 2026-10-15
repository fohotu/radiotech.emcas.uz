
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    Search, BookOpen, Languages, FileText, ArrowRight,
    Radio, Network, Wifi, Globe2, ShieldCheck,
    ChevronRight, ExternalLink, Clock3, Menu, X,
} from 'lucide-react';

const stats = [
    { label: 'Терминов в базе', value: '2 480', icon: BookOpen },
    { label: 'Языков', value: '3', icon: Languages },
    { label: 'Источников', value: '156', icon: FileText },
    { label: 'Проверенных терминов', value: '94%', icon: ShieldCheck },
];

const categories = [
    { id: 1, title: 'Радиочастотный спектр', count: 420, icon: Radio, color: 'blue' },
    { id: 2, title: 'Радиосвязь', count: 365, icon: Wifi, color: 'violet' },
    { id: 3, title: 'Телекоммуникации', count: 512, icon: Network, color: 'emerald' },
    { id: 4, title: 'Стандарты ITU', count: 284, icon: Globe2, color: 'amber' },
];

const terms = [
    {
        id: 1,
        term: 'Радиочастотный спектр',
        en: 'Radio-frequency spectrum',
        uz: 'Radiochastota spektri',
        category: 'Радиочастотный спектр',
        definition:
            'Совокупность радиочастот, расположенных в определённом диапазоне, которые могут использоваться для радиосвязи и других радиотехнологий.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        updated: '12.10.2026',
        status: 'Проверено',
    },
    {
        id: 2,
        term: 'Полоса частот',
        en: 'Frequency band',
        uz: 'Chastotalar polosasi',
        category: 'Радиочастотный спектр',
        definition:
            'Непрерывный участок радиочастотного спектра, ограниченный двумя заданными частотами.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        updated: '08.10.2026',
        status: 'Проверено',
    },
    {
        id: 3,
        term: 'Радиослужба',
        en: 'Radiocommunication service',
        uz: 'Radi aloqa xizmati',
        category: 'Радиосвязь',
        definition:
            'Служба, определённая в Регламенте радиосвязи и включающая передачу, излучение и приём радиоволн для конкретных целей электросвязи.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        updated: '06.10.2026',
        status: 'Проверено',
    },
    {
        id: 4,
        term: 'Электромагнитная совместимость',
        en: 'Electromagnetic compatibility',
        uz: 'Elektromagnit moslashuv',
        category: 'Телекоммуникации',
        definition:
            'Способность оборудования функционировать удовлетворительно в электромагнитной обстановке, не создавая недопустимых электромагнитных помех другим устройствам.',
        source: 'Технический словарь',
        sourceCode: 'EMC',
        updated: '02.10.2026',
        status: 'На проверке',
    },
    {
        id: 5,
        term: 'Международный союз электросвязи',
        en: 'International Telecommunication Union',
        uz: 'Xalqaro elektraloqa ittifoqi',
        category: 'Стандарты ITU',
        definition:
            'Специализированное учреждение ООН, занимающееся вопросами информационно-коммуникационных технологий и международной координацией электросвязи.',
        source: 'Официальные материалы ITU',
        sourceCode: 'ITU',
        updated: '29.09.2026',
        status: 'Проверено',
    },
    {
        id: 6,
        term: 'Присвоение радиочастоты',
        en: 'Frequency assignment',
        uz: 'Radiochastotani biriktirish',
        category: 'Радиочастотный спектр',
        definition:
            'Разрешение, выданное радиостанции на использование радиочастоты или канала радиочастот в установленных условиях.',
        source: 'Регламент радиосвязи ITU',
        sourceCode: 'RR, статья 1',
        updated: '24.09.2026',
        status: 'Проверено',
    },
];

const colors = {
    blue: 'bg-blue-50 text-blue-700',
    violet: 'bg-violet-50 text-violet-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
};

export default function Home() {
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('Все языки');
    const [category, setCategory] = useState('Все категории');
    const [selected, setSelected] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const filteredTerms = useMemo(() => {
        const q = query.trim().toLowerCase();

        return terms.filter((item) => {
            const matchesQuery =
                !q ||
                [item.term, item.en, item.uz, item.definition, item.source]
                    .some((value) => value.toLowerCase().includes(q));

            const matchesCategory =
                category === 'Все категории' || item.category === category;

            const matchesLanguage =
                language === 'Все языки' ||
                (language === 'Русский' && item.term) ||
                (language === 'English' && item.en) ||
                (language === 'O‘zbekcha' && item.uz);

            return matchesQuery && matchesCategory && matchesLanguage;
        });
    }, [query, category, language]);

    const openTerm = (item) => {
        setSelected(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Терминологический портал — Поиск определений" />

            <div className="min-h-screen bg-slate-50 text-slate-800">
                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                        <a href="#home" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
                                <BookOpen size={23} />
                            </div>
                            <div>
                                <div className="font-bold leading-tight text-slate-900">
                                    RadioTerm
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    Терминологическая система
                                </div>
                            </div>
                        </a>

                        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
                            <a href="#search" className="text-blue-700">Поиск терминов</a>
                            <a href="#categories" className="hover:text-blue-700">Категории</a>
                            <a href="#catalog" className="hover:text-blue-700">Словарь</a>
                            <a href="#about" className="hover:text-blue-700">О системе</a>
                        </nav>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileMenu(!mobileMenu)}
                                className="rounded-lg p-2 text-slate-600 md:hidden"
                                aria-label="Открыть меню"
                            >
                                {mobileMenu ? <X size={21} /> : <Menu size={21} />}
                            </button>
                            <a href="/login" className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
                                Войти
                            </a>
                        </div>
                    </div>

                    {mobileMenu && (
                        <nav className="grid gap-1 border-t border-slate-100 px-5 py-3 text-sm md:hidden">
                            <a className="rounded-lg p-3 hover:bg-slate-50" href="#search" onClick={() => setMobileMenu(false)}>Поиск терминов</a>
                            <a className="rounded-lg p-3 hover:bg-slate-50" href="#categories" onClick={() => setMobileMenu(false)}>Категории</a>
                            <a className="rounded-lg p-3 hover:bg-slate-50" href="#catalog" onClick={() => setMobileMenu(false)}>Словарь</a>
                            <a className="rounded-lg p-3 hover:bg-slate-50" href="#about" onClick={() => setMobileMenu(false)}>О системе</a>
                        </nav>
                    )}
                </header>

                <main id="home">
                    <section id="search" className="relative overflow-hidden bg-white">
                        <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
                        <div className="absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

                        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
                            <div className="mx-auto max-w-3xl text-center">
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                    Единая база терминов
                                </div>

                                <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                                    Найдите нужный термин.
                                    <span className="mt-2 block text-blue-700">
                                        Изучите его значение.
                                    </span>
                                </h1>

                                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                                    Термины и определения в области радиосвязи,
                                    радиочастотного спектра, телекоммуникаций и стандартов ITU.
                                </p>

                                <div className="mx-auto mt-9 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
                                    <Search className="ml-3 shrink-0 text-slate-400" size={22} />
                                    <input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Введите термин, определение или аббревиатуру..."
                                        className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm outline-none focus:ring-0 sm:text-base"
                                    />
                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => setQuery('')}
                                            className="rounded-lg px-2 py-2 text-sm text-slate-400 hover:text-slate-700"
                                        >
                                            Очистить
                                        </button>
                                    )}
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                                    <span className="text-slate-400">Популярные запросы:</span>
                                    {['Радиочастотный спектр', 'Полоса частот', 'ITU'].map((term) => (
                                        <button
                                            type="button"
                                            key={term}
                                            onClick={() => setQuery(term)}
                                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {stats.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                            <Icon size={22} />
                                        </div>
                                        <div className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                            {item.value}
                                        </div>
                                        <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section id="categories" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
                        <div className="mb-6">
                            <p className="text-sm font-semibold text-blue-700">Области знаний</p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Категории терминов
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Выберите тематический раздел для быстрого поиска
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => {
                                            setCategory(item.title);
                                            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                                    >
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[item.color]}`}>
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="mt-5 font-semibold leading-6 text-slate-800 group-hover:text-blue-700">
                                            {item.title}
                                        </h3>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm text-slate-500">{item.count} терминов</span>
                                            <ArrowRight size={17} className="text-slate-400 group-hover:text-blue-700" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <section id="catalog" className="border-y border-slate-200 bg-white">
                        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
                            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                                <div>
                                    <p className="text-sm font-semibold text-blue-700">Терминологическая база</p>
                                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                        Термины и определения
                                    </h2>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Ищите определения и проверяйте первоисточники
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <select
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        className="rounded-lg border-slate-200 bg-white text-sm text-slate-700 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option>Все категории</option>
                                        {[...new Set(terms.map((item) => item.category))].map((item) => (
                                            <option key={item}>{item}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={language}
                                        onChange={(event) => setLanguage(event.target.value)}
                                        className="rounded-lg border-slate-200 bg-white text-sm text-slate-700 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option>Все языки</option>
                                        <option>Русский</option>
                                        <option>English</option>
                                        <option>O‘zbekcha</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                {filteredTerms.map((item) => (
                                    <article
                                        key={item.id}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md sm:p-6"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                                                    {item.category}
                                                </span>
                                                <h3 className="mt-2 text-lg font-bold leading-7 text-slate-900">
                                                    {item.term}
                                                </h3>
                                                <p className="mt-1 text-sm text-slate-500">{item.en}</p>
                                            </div>
                                            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${item.status === 'Проверено' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                                            {item.definition}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                            <span className="inline-flex items-center gap-1.5">
                                                <FileText size={14} />
                                                {item.source}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock3 size={14} />
                                                {item.updated}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => openTerm(item)}
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                                        >
                                            Полное определение <ChevronRight size={17} />
                                        </button>
                                    </article>
                                ))}
                            </div>

                            {filteredTerms.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
                                    <Search className="mx-auto text-slate-300" size={36} />
                                    <h3 className="mt-3 font-semibold text-slate-800">Термины не найдены</h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Попробуйте изменить запрос или фильтры.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery('');
                                            setCategory('Все категории');
                                            setLanguage('Все языки');
                                        }}
                                        className="mt-4 text-sm font-semibold text-blue-700"
                                    >
                                        Сбросить фильтры
                                    </button>
                                </div>
                            )}

                            <div className="mt-5 text-sm text-slate-500">
                                Найдено терминов: {filteredTerms.length}
                            </div>
                        </div>
                    </section>

                    <section id="about" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
                        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-2 text-sm font-medium text-blue-300">
                                    <ShieldCheck size={18} />
                                    Достоверность и источники
                                </div>
                                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                    Определения с указанием первоисточника
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-300">
                                    Система помогает находить терминологию, сравнивать
                                    переводы и проверять определения по нормативным материалам.
                                </p>
                            </div>

                            <a href="#catalog" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-blue-50">
                                Открыть словарь <ArrowRight size={17} />
                            </a>
                        </div>
                    </section>
                </main>

                {selected && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setSelected(null);
                        }}
                    >
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="term-dialog-title"
                            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                                        {selected.category}
                                    </span>
                                    <h2 id="term-dialog-title" className="mt-2 text-2xl font-bold text-slate-900">
                                        {selected.term}
                                    </h2>
                                    <p className="mt-2 text-sm text-slate-500">{selected.en}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    aria-label="Закрыть"
                                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                >
                                    <span className="text-xl">×</span>
                                </button>
                            </div>

                            <div className="mt-7">
                                <h3 className="text-sm font-semibold text-slate-500">ОПРЕДЕЛЕНИЕ</h3>
                                <p className="mt-3 text-base leading-7 text-slate-700">
                                    {selected.definition}
                                </p>
                            </div>

                            <div className="mt-6 rounded-xl bg-slate-50 p-4">
                                <h3 className="text-sm font-semibold text-slate-700">Переводы</h3>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-slate-500">English</p>
                                        <p className="mt-1 text-sm font-medium">{selected.en}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">O‘zbekcha</p>
                                        <p className="mt-1 text-sm font-medium">{selected.uz}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-5">
                                <h3 className="text-sm font-semibold text-slate-700">Источник определения</h3>
                                <p className="mt-2 text-sm text-slate-600">{selected.source}</p>
                                <p className="mt-1 text-sm text-slate-500">{selected.sourceCode}</p>
                                <p className="mt-3 text-xs text-slate-400">
                                    Дата обновления: {selected.updated}
                                </p>
                            </div>

                            <div className="mt-7 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                        <p>© 2026 RadioTerm — терминологическая система</p>
                        <p>Демонстрационная версия · Статические данные</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
