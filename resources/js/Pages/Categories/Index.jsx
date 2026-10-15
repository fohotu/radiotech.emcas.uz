
import { Link } from '@inertiajs/react';
import { Radio, Wifi, Network, Globe2, ArrowRight } from 'lucide-react';
import PublicLayout from '../../Components/PublicLayout';

const categories = [
    {
        id: 1,
        slug: 'radio-frequency-spectrum',
        title: 'Радиочастотный спектр',
        description: 'Распределение, присвоение и использование радиочастот и полос частот.',
        count: 420,
        icon: Radio,
        color: 'bg-blue-50 text-blue-700',
    },
    {
        id: 2,
        slug: 'radiocommunication',
        title: 'Радиосвязь',
        description: 'Радиослужбы, радиостанции, радиопередача и приём сигналов.',
        count: 365,
        icon: Wifi,
        color: 'bg-violet-50 text-violet-700',
    },
    {
        id: 3,
        slug: 'telecommunications',
        title: 'Телекоммуникации',
        description: 'Технические понятия, сети, оборудование и услуги электросвязи.',
        count: 512,
        icon: Network,
        color: 'bg-emerald-50 text-emerald-700',
    },
    {
        id: 4,
        slug: 'itu-standards',
        title: 'Стандарты ITU',
        description: 'Терминология международных регламентов и рекомендаций ITU.',
        count: 284,
        icon: Globe2,
        color: 'bg-amber-50 text-amber-700',
    },
];

export default function Index() {
    return (
        <PublicLayout
            title="Категории"
            description="Термины организованы по тематическим направлениям, чтобы вы могли быстро найти нужное понятие."
        >
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Все направления</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            {categories.length} тематических раздела
                        </p>
                    </div>
                    <Link href="/terms" className="hidden items-center gap-2 text-sm font-semibold text-blue-700 sm:flex">
                        Открыть словарь <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {categories.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.id}
                                href={`/categories/${item.id}`}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-7"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                                        <Icon size={27} />
                                    </div>
                                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                        {item.count} терминов
                                    </span>
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-blue-700">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    {item.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700">
                                    Смотреть термины
                                    <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </PublicLayout>
    );
}
