
import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Search, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import PublicLayout from '../../Components/PublicLayout';

const terms = [
    {
        id: 1,
        term: 'Радиочастотный спектр',
        en: 'Radio-frequency spectrum',
        uz: 'Radiochastota spektri',
        category: 'Радиочастотный спектр',
        definition: 'Совокупность радиочастот, используемых для радиосвязи и других радиотехнологий.',
        source: 'Регламент радиосвязи ITU',
        status: 'Проверено',
    },
    {
        id: 2,
        term: 'Полоса частот',
        en: 'Frequency band',
        uz: 'Chastotalar polosasi',
        category: 'Радиочастотный спектр',
        definition: 'Участок радиочастотного спектра, ограниченный двумя заданными частотами.',
        source: 'Регламент радиосвязи ITU',
        status: 'Проверено',
    },
    {
        id: 3,
        term: 'Радиослужба',
        en: 'Radiocommunication service',
        uz: 'Radi aloqa xizmati',
        category: 'Радиосвязь',
        definition: 'Служба передачи, излучения и приёма радиоволн для установленных целей.',
        source: 'Регламент радиосвязи ITU',
        status: 'Проверено',
    },
    {
        id: 4,
        term: 'Электромагнитная совместимость',
        en: 'Electromagnetic compatibility',
        uz: 'Elektromagnit moslashuv',
        category: 'Телекоммуникации',
        definition: 'Способность оборудования работать без недопустимых электромагнитных помех.',
        source: 'Технический словарь',
        status: 'На проверке',
    },
    {
        id: 5,
        term: 'Присвоение радиочастоты',
        en: 'Frequency assignment',
        uz: 'Radiochastotani biriktirish',
        category: 'Радиочастотный спектр',
        definition: 'Разрешение на использование радиочастоты или радиочастотного канала в установленных условиях.',
        source: 'Регламент радиосвязи ITU',
        status: 'Проверено',
    },
    {
        id: 6,
        term: 'Международный союз электросвязи',
        en: 'International Telecommunication Union',
        uz: 'Xalqaro elektraloqa ittifoqi',
        category: 'Стандарты ITU',
        definition: 'Специализированное учреждение ООН в области информационно-коммуникационных технологий.',
        source: 'Официальные материалы ITU',
        status: 'Проверено',
    },
];

export default function Index() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('Все категории');
    const [language, setLanguage] = useState('Все языки');
    const [letter, setLetter] = useState('');

    const categories = [...new Set(terms.map((item) => item.category))];

    const filtered = useMemo(() => {
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

            const matchesLetter =
                !letter || item.term.toUpperCase().startsWith(letter);

            return matchesQuery && matchesCategory && matchesLanguage && matchesLetter;
        });
    }, [query, category, language, letter]);

    const letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЯ'.split('');

    return (
        <PublicLayout
            title="Словарь терминов"
            description="Ищите отраслевые термины, сравнивайте переводы и знакомьтесь с определениями из нормативных и технических источников."
        >
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="font-semibold text-slate-900">Фильтры</h2>

                        <label className="mt-5 block text-sm font-medium text-slate-700">
                            Категория
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-2 w-full rounded-lg border-slate-200 text-sm"
                        >
                            <option>Все категории</option>
                            {categories.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>

                        <label className="mt-5 block text-sm font-medium text-slate-700">
                            Язык термина
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="mt-2 w-full rounded-lg border-slate-200 text-sm"
                        >
                            <option>Все языки</option>
                            <option>Русский</option>
                            <option>English</option>
                            <option>O‘zbekcha</option>
                        </select>

                        <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                setCategory('Все категории');
                                setLanguage('Все языки');
                                setLetter('');
                            }}
                            className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900"
                        >
                            Сбросить фильтры
                        </button>
                    </aside>

                    <section>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2">
                            <Search className="ml-3 shrink-0 text-slate-400" size={21} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Поиск термина, определения или перевода..."
                                className="min-w-0 flex-1 border-0 py-3 text-sm focus:ring-0"
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            <button
                                onClick={() => setLetter('')}
                                className={`rounded-md px-2.5 py-2 text-sm ${!letter ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                            >
                                Все
                            </button>
                            {letters.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setLetter(letter === item ? '' : item)}
                                    className={`rounded-md px-2.5 py-2 text-sm ${letter === item ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">
                                Список терминов
                            </h2>
                            <span className="text-sm text-slate-500">
                                Найдено: {filtered.length}
                            </span>
                        </div>

                        <div className="mt-4 space-y-3">
                            {filtered.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/terms/${item.id}`}
                                    className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <span className="text-xs font-semibold text-blue-700">
                                                {item.category}
                                            </span>
                                            <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                                                {item.term}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {item.en} · {item.uz}
                                            </p>
                                        </div>
                                        <ChevronRight className="mt-2 shrink-0 text-slate-400 group-hover:text-blue-700" size={20} />
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-slate-600">
                                        {item.definition}
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                        <span className="text-xs text-slate-500">
                                            Источник: {item.source}
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${item.status === 'Проверено' ? 'text-emerald-700' : 'text-amber-700'}`}>
                                            <CheckCircle2 size={14} />
                                            {item.status}
                                        </span>
                                    </div>
                                </Link>
                            ))}

                            {filtered.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
                                    <BookOpen className="mx-auto text-slate-300" size={36} />
                                    <p className="mt-3 font-semibold text-slate-800">
                                        Термины не найдены
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Попробуйте изменить запрос или фильтры.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}
