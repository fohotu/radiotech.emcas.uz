
import { Link } from '@inertiajs/react';
import {
    BookOpen, Globe2, ShieldCheck, FileSearch, Languages, ArrowRight,
} from 'lucide-react';
import PublicLayout from '../Components/PublicLayout';

const features = [
    {
        icon: FileSearch,
        title: 'Единый поиск',
        description: 'Поиск по названию термина, определению, переводу и связанным понятиям.',
    },
    {
        icon: Languages,
        title: 'Три языка',
        description: 'Сопоставление терминов на русском, узбекском и английском языках.',
    },
    {
        icon: ShieldCheck,
        title: 'Проверяемые определения',
        description: 'Возможность указывать источник, редакцию документа и статус экспертной проверки.',
    },
    {
        icon: Globe2,
        title: 'Международные стандарты',
        description: 'Терминология радиосвязи, радиочастотного спектра и телекоммуникаций.',
    },
];

export default function About() {
    return (
        <PublicLayout
            title="О системе"
            description="RadioTerm — концепция единой терминологической базы для поиска, сравнения и проверки отраслевых терминов."
        >
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                <section className="overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-12">
                    <div className="max-w-3xl">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                            <BookOpen size={30} />
                        </div>

                        <p className="mt-7 text-sm font-semibold uppercase tracking-widest text-blue-300">
                            О проекте RadioTerm
                        </p>

                        <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                            Единый язык профессиональной терминологии
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-300">
                            Система предназначена для поиска и сопоставления терминов и определений
                            в области радиочастотного спектра, радиосвязи, телекоммуникаций
                            и международных технических стандартов.
                        </p>

                        <Link
                            href="/terms"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
                        >
                            Перейти к словарю <ArrowRight size={17} />
                        </Link>
                    </div>
                </section>

                <section className="py-12">
                    <h2 className="text-2xl font-bold text-slate-900">Возможности системы</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Основные функции публичной части терминологического портала
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {features.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="mt-4 font-bold text-slate-900">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {item.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-slate-900">Как оценивается достоверность</h2>

                    <div className="mt-5 space-y-4">
                        {[
                            ['Официальное определение', 'Текст взят из нормативного источника с указанием редакции и пункта.'],
                            ['Проверенный перевод', 'Перевод сопоставлен с оригиналом и прошёл экспертную проверку.'],
                            ['Рабочий перевод', 'Перевод подготовлен, но ещё требует подтверждения специалиста.'],
                            ['Не проверено', 'Запись добавлена в базу, но источник или формулировка ещё проверяются.'],
                        ].map(([title, description]) => (
                            <div key={title} className="flex gap-3">
                                <ShieldCheck className="mt-0.5 shrink-0 text-blue-700" size={20} />
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
