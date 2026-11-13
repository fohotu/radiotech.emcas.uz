
import React from 'react';
import { Link } from '@inertiajs/react';
import {
    BookOpen, Cpu, Users, Eye, TrendingUp,
    Plus, ArrowUpRight, Clock3, FileText,
    Languages, CircleCheck, CircleAlert,
} from 'lucide-react';

import AdminLayout from '@/Layouts/AdminLayout';

const number = (value) =>
    new Intl.NumberFormat('ru-RU').format(value ?? 0);

function StatCard({ title, value, change, note, icon: Icon }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                        {number(value)}
                    </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <Icon size={21} />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
                    <TrendingUp size={13} />
                    {change}
                </span>
                <span className="text-slate-400">{note}</span>
            </div>
        </div>
    );
}

function VisitsChart({ data = [] }) {
    const max = Math.max(...data.map(item => item.value), 1);

    const points = data.map((item, index) => {
        const x = data.length < 2
            ? 50
            : (index / (data.length - 1)) * 100;

        const y = 92 - (item.value / max) * 76;

        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="mt-5">
            <div className="relative h-56 w-full">
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3].map(line => (
                        <div key={line} className="border-t border-dashed border-slate-200" />
                    ))}
                </div>

                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                >
                    <defs>
                        <linearGradient id="visitsFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity=".20" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {data.length > 1 && (
                        <polygon
                            points={`0,100 ${points} 100,100`}
                            fill="url(#visitsFill)"
                        />
                    )}

                    {data.length > 1 && (
                        <polyline
                            points={points}
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="2.2"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>
            </div>

            <div className="mt-2 flex justify-between text-xs text-slate-400">
                {data.map(item => (
                    <span key={item.label}>{item.label}</span>
                ))}
            </div>
        </div>
    );
}

function ProgressRow({ label, value, total, color }) {
    const percent = total
        ? Math.min(100, Math.round((value / total) * 100))
        : 0;

    return (
        <div>
            <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="text-slate-500">
                    {number(value)} ({percent}%)
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

export default function Dashboard({
    stats = {},
    visits = [],
    termLanguages = [],
    recentTerms = [],
    popularTerms = [],
    recentActivity = [],
}) {
    const chartData = visits.length ? visits : [
        { label: '15 окт', value: 180 },
        { label: '19 окт', value: 240 },
        { label: '23 окт', value: 210 },
        { label: '27 окт', value: 330 },
        { label: '31 окт', value: 290 },
        { label: '4 ноя', value: 410 },
        { label: '8 ноя', value: 370 },
        { label: '13 ноя', value: 520 },
    ];

    const languages = termLanguages.length ? termLanguages : [
        { code: 'UZ', label: 'Узбекский', count: 1120, color: 'bg-emerald-500' },
        { code: 'RU', label: 'Русский', count: 1084, color: 'bg-blue-500' },
        { code: 'EN', label: 'Английский', count: 965, color: 'bg-violet-500' },
    ];

    const terms = recentTerms.length ? recentTerms : [
        {
            id: 1,
            title: 'Radio frequency',
            category: 'Радиочастотный спектр',
            language: 'EN / RU / UZ',
            status: 'Опубликован',
            date: '13 ноя 2026',
        },
        {
            id: 2,
            title: 'Spectrum management',
            category: 'Управление спектром',
            language: 'EN / RU',
            status: 'Черновик',
            date: '12 ноя 2026',
        },
    ];

    const totalTranslations = languages.reduce(
        (sum, item) => sum + item.count, 0
    );

    const cards = [
        {
            title: 'Всего терминов',
            value: stats.terms ?? 1248,
            change: '+12,8%',
            note: 'к прошлому месяцу',
            icon: BookOpen,
        },
        {
            title: 'Посещения',
            value: stats.visits ?? 8542,
            change: '+8,4%',
            note: 'за выбранный период',
            icon: Eye,
        },
        {
            title: 'Технологии',
            value: stats.technologies ?? 36,
            change: '+3',
            note: 'за этот месяц',
            icon: Cpu,
        },
        {
            title: 'Пользователи',
            value: stats.users ?? 125,
            change: '+5,2%',
            note: 'к прошлому месяцу',
            icon: Users,
        },
    ];

    return (
        <AdminLayout
            title="Главная панель"
            termCount={stats.terms ?? 1248}
        >
            <div className="space-y-7">

                {/* WELCOME */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm text-slate-500">Обзор системы</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-900">
                            Добро пожаловать!
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Общая информация о состоянии системы терминов и определений.
                        </p>
                    </div>

                    <Link
                        href="/admin/terms/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        <Plus size={17} />
                        Добавить термин
                    </Link>
                </div>

                {/* STATISTICS CARDS */}
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map(card => (
                        <StatCard key={card.title} {...card} />
                    ))}
                </section>

                {/* VISITS AND LANGUAGES */}
                <section className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="font-semibold text-slate-900">
                            Статистика посещений
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                            Динамика посещаемости системы
                        </p>

                        <p className="mt-5 text-3xl font-bold text-slate-900">
                            {number(stats.visits ?? 8542)}
                        </p>

                        <VisitsChart data={chartData} />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Термины по языкам
                                </h3>
                                <p className="mt-1 text-xs text-slate-400">
                                    Заполненность переводов
                                </p>
                            </div>
                            <Languages className="text-indigo-500" size={20} />
                        </div>

                        <div className="my-6 flex justify-center">
                            <div
                                className="flex h-40 w-40 items-center justify-center rounded-full"
                                style={{
                                    background: 'conic-gradient(#10b981 0 35%, #3b82f6 35% 68%, #8b5cf6 68% 100%)',
                                }}
                            >
                                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                                    <span className="text-2xl font-bold text-slate-900">
                                        {number(stats.translations ?? totalTranslations)}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        переводов
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {languages.map(lang => (
                                <ProgressRow
                                    key={lang.code}
                                    label={lang.label}
                                    value={lang.count}
                                    total={Math.max(...languages.map(item => item.count), 1)}
                                    color={lang.color}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* RECENT TERMS */}
                <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Последние термины
                                </h3>
                                <p className="mt-1 text-xs text-slate-400">
                                    Недавно добавленные записи
                                </p>
                            </div>

                            <Link
                                href="/admin/terms"
                                className="text-xs font-semibold text-indigo-600"
                            >
                                Все термины <ArrowUpRight size={13} className="inline" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[650px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs text-slate-400">
                                    <tr>
                                        <th className="px-5 py-3">Термин</th>
                                        <th className="px-5 py-3">Категория</th>
                                        <th className="px-5 py-3">Языки</th>
                                        <th className="px-5 py-3">Статус</th>
                                        <th className="px-5 py-3">Дата</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {terms.map(term => (
                                        <tr key={term.id}>
                                            <td className="px-5 py-4 font-semibold">
                                                {term.title}
                                            </td>
                                            <td className="px-5 py-4 text-slate-500">
                                                {term.category}
                                            </td>
                                            <td className="px-5 py-4 text-xs">
                                                {term.language}
                                            </td>
                                            <td className="px-5 py-4">
                                                {term.status}
                                            </td>
                                            <td className="px-5 py-4 text-xs text-slate-400">
                                                {term.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* DICTIONARY STATUS */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Состояние словаря
                                </h3>
                                <p className="mt-1 text-xs text-slate-400">
                                    Публикация и проверка
                                </p>
                            </div>
                            <FileText className="text-indigo-500" size={20} />
                        </div>

                        <div className="mt-6 space-y-5">
                            <ProgressRow
                                label="Опубликовано"
                                value={stats.published ?? 1080}
                                total={stats.terms ?? 1248}
                                color="bg-emerald-500"
                            />
                            <ProgressRow
                                label="Черновики"
                                value={stats.drafts ?? 112}
                                total={stats.terms ?? 1248}
                                color="bg-amber-400"
                            />
                            <ProgressRow
                                label="На проверке"
                                value={stats.pending ?? 56}
                                total={stats.terms ?? 1248}
                                color="bg-blue-500"
                            />
                        </div>

                        <div className="mt-6 rounded-xl bg-amber-50 p-3">
                            <div className="flex gap-2 text-amber-800">
                                <CircleAlert size={16} />
                                <p className="text-xs font-semibold">
                                    Требуют внимания
                                </p>
                            </div>
                            <p className="mt-1 pl-6 text-xs text-amber-700">
                                {stats.incompleteTranslations ?? 24} терминов имеют неполный набор переводов.
                            </p>
                        </div>
                    </div>
                </section>

                {/* POPULAR TERMS AND ACTIVITY */}
                <section className="grid gap-5 lg:grid-cols-2">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            Популярные термины
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                            По количеству просмотров
                        </p>

                        <div className="mt-4 space-y-3">
                            {(popularTerms.length ? popularTerms : [
                                { title: 'Radio Frequency', views: 1250 },
                                { title: 'Frequency band', views: 980 },
                                { title: 'Spectrum allocation', views: 760 },
                                { title: 'Broadcasting', views: 540 },
                            ]).map((term, index) => (
                                <div key={term.title} className="flex items-center gap-3">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 text-sm font-medium">
                                        {term.title}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {number(term.views)} просмотров
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            Последние действия
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                            Активность в административной панели
                        </p>

                        <div className="mt-4 space-y-4">
                            {(recentActivity.length ? recentActivity : [
                                { id: 1, text: 'Добавлен новый термин', detail: 'Radio frequency', time: '10 минут назад' },
                                { id: 2, text: 'Обновлён перевод', detail: 'Spectrum management · UZ', time: '35 минут назад' },
                                { id: 3, text: 'Опубликован термин', detail: 'Frequency allocation', time: '2 часа назад' },
                            ]).map(item => (
                                <div key={item.id} className="flex gap-3">
                                    <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                        <CircleCheck size={15} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">{item.text}</p>
                                        <p className="mt-0.5 text-xs text-slate-400">
                                            {item.detail}
                                        </p>
                                    </div>
                                    <span className="whitespace-nowrap text-[11px] text-slate-400">
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="pb-3 pt-1 text-center text-xs text-slate-400">
                    Terminology Management System · Панель управления
                </footer>

            </div>
        </AdminLayout>
    );
}
