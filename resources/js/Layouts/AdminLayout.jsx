
import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, BookOpen, Cpu, Users, Settings,
    ChartNoAxesCombined, Search, Bell, ChevronDown,
    Plus, Globe2, Activity, Menu, X,
} from 'lucide-react';

const menu = [
    { label: 'Главная', href: '/admin', icon: LayoutDashboard },
    { label: 'Термины и определения', href: '/admin/terms', icon: BookOpen },
    { label: 'Технологии', href: '/admin/technologies', icon: Cpu },
    { label: 'Пользователи', href: '/admin/users', icon: Users },
    { label: 'Статистика', href: '/admin/statistics', icon: ChartNoAxesCombined },
    { label: 'Настройки', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
    children,
    title = 'Главная панель',
    termCount = 0,
}) {
    const { url, props } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);

    const user = props.auth?.user;
    const userName = user?.name ?? 'Администратор';

    const isActive = (href) => {
        if (href === '/admin') {
            return url === '/admin' || url === '/admin/';
        }

        return url === href || url.startsWith(`${href}/`);
    };

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen bg-slate-50 text-slate-800">

                {mobileOpen && (
                    <button
                        aria-label="Закрыть меню"
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
                    />
                )}

                {/* SIDEBAR */}
                <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>

                    <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
                        <Link href="/admin" className="flex items-center gap-3">
                            <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
                                <Activity size={21} />
                            </div>

                            <div>
                                <div className="font-bold tracking-tight text-slate-900">
                                    TERMINOLOGY
                                </div>
                                <div className="text-[10px] font-semibold tracking-[.18em] text-slate-400">
                                    MANAGEMENT SYSTEM
                                </div>
                            </div>
                        </Link>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-slate-400 lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="px-4 pt-7">
                        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
                            Рабочая область
                        </p>

                        <nav className="space-y-1">
                            {menu.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                        isActive(href)
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon size={19} />
                                    {label}

                                    {label === 'Термины и определения' && (
                                        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px]">
                                            {termCount}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* SIDEBAR FOOTER */}
                    <div className="mt-auto p-4">
                        <div className="rounded-2xl bg-slate-900 p-4 text-white">
                            <div className="mb-2 flex items-center gap-2 text-indigo-300">
                                <Globe2 size={17} />
                                <span className="text-xs font-semibold">
                                    Многоязычный словарь
                                </span>
                            </div>

                            <p className="text-xs leading-5 text-slate-300">
                                Управляйте терминами и переводами в одном месте.
                            </p>

                            <Link
                                href="/admin/terms/create"
                                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
                            >
                                <Plus size={14} />
                                Добавить термин
                            </Link>
                        </div>

                        <div className="mt-4 flex items-center gap-3 px-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                                {userName.substring(0, 2).toUpperCase()}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">
                                    {userName}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {user?.email ?? 'Системный доступ'}
                                </p>
                            </div>

                            <Settings size={17} className="text-slate-400" />
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="min-h-screen lg:pl-64">

                    {/* HEADER */}
                    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8">

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                            >
                                <Menu size={21} />
                            </button>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Рабочая область / {title}
                                </p>
                                <h1 className="text-lg font-semibold text-slate-900">
                                    {title}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                                <Search size={16} className="text-slate-400" />
                                <input
                                    placeholder="Поиск..."
                                    className="w-36 bg-transparent text-sm outline-none"
                                />
                            </div>

                            <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500">
                                <Bell size={18} />
                                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
                            </button>

                            <button className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 sm:flex">
                                RU <ChevronDown size={14} />
                            </button>
                        </div>
                    </header>

                    {/* PAGE CONTENT */}
                    <div className="mx-auto max-w-[1500px] p-4 sm:p-8">
                        {children}
                    </div>

                </main>
            </div>
        </>
    );
}
