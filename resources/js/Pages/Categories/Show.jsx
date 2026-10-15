
import { Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '../../Components/PublicLayout';

const categories = [
    {
        id: 1,
        title: 'Радиочастотный спектр',
        description: 'Термины, связанные с использованием радиочастот, полос частот, присвоениями и международной координацией.',
    },
    {
        id: 2,
        title: 'Радиосвязь',
        description: 'Понятия радиослужб, радиостанций и передачи радиосигналов.',
    },
    {
        id: 3,
        title: 'Телекоммуникации',
        description: 'Терминология сетей, электросвязи и технического оборудования.',
    },
    {
        id: 4,
        title: 'Стандарты ITU',
        description: 'Понятия международных регламентов и рекомендаций.',
    },
];

const terms = [
    { id: 1, categoryId: 1, term: 'Радиочастотный спектр', en: 'Radio-frequency spectrum', definition: 'Совокупность радиочастот, используемых для радиосвязи.' },
    { id: 2, categoryId: 1, term: 'Полоса частот', en: 'Frequency band', definition: 'Участок спектра, ограниченный двумя заданными частотами.' },
    { id: 3, categoryId: 1, term: 'Присвоение радиочастоты', en: 'Frequency assignment', definition: 'Разрешение на использование радиочастоты в установленных условиях.' },
    { id: 4, categoryId: 2, term: 'Радиослужба', en: 'Radiocommunication service', definition: 'Служба передачи, излучения и приёма радиоволн.' },
    { id: 5, categoryId: 3, term: 'Электромагнитная совместимость', en: 'Electromagnetic compatibility', definition: 'Способность оборудования работать без недопустимых помех.' },
    { id: 6, categoryId: 4, term: 'Международный союз электросвязи', en: 'International Telecommunication Union', definition: 'Специализированное учреждение ООН в области электросвязи.' },
];

export default function Show({ id = 1 }) {
    const category = categories.find((item) => item.id === Number(id)) ?? categories[0];
    const [query, setQuery] = useState('');

    const filtered = terms.filter((item) => {
        return item.categoryId === category.id &&
            `${item.term} ${item.en} ${item.definition}`.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <PublicLayout title={category.title} description={category.description}>
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700">
                    <ArrowLeft size={17} /> Все категории
                </Link>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <BookOpen size={25} />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-slate-900">
                        Термины раздела
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Найдено: {filtered.length}
                    </p>

                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 px-4">
                        <Search size={19} className="shrink-0 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Поиск внутри категории..."
                            className="w-full border-0 py-3 text-sm focus:ring-0"
                        />
                    </div>

                    <div className="mt-5 divide-y divide-slate-100">
                        {filtered.map((item) => (
                            <Link
                                key={item.id}
                                href={`/terms/${item.id}`}
                                className="group flex items-center justify-between gap-4 py-5"
                            >
                                <div>
                                    <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">
                                        {item.term}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">{item.en}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.definition}</p>
                                </div>
                                <ChevronRight size={19} className="shrink-0 text-slate-400 group-hover:text-blue-700" />
                            </Link>
                        ))}

                        {filtered.length === 0 && (
                            <p className="py-10 text-center text-sm text-slate-500">
                                В этой категории ничего не найдено.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
