
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Search, Layers, Library, Info, Globe, Menu } from 'lucide-react';
import { useState } from 'react';

const navigation = [
    { title: 'Главная', href: '/', icon: BookOpen },
    { title: 'Словарь', href: '/terms', icon: Search },
    { title: 'Категории', href: '/categories', icon: Layers },
    { title: 'Источники', href: '/sources', icon: Library },
    { title: 'О системе', href: '/about', icon: Info },
];

export default function PublicLayout({ title, description, children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title={title ? `${title} — RadioTerm` : 'RadioTerm'} />

            <div className="min-h-screen bg-slate-50 text-slate-800">
                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
                        <Link href="/" className="flex shrink-0 items-center gap-3">
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
                        </Link>

                        <nav className="hidden items-center gap-5 lg:flex">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <span className="hidden items-center gap-1.5 text-sm text-slate-500 sm:flex">
                                <Globe size={16} /> RU
                            </span>
                            <Link
                                href="/login"
                                className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                            >
                                Войти
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="rounded-lg p-2 text-slate-600 lg:hidden"
                                aria-label="Открыть меню"
                            >
                                <Menu size={21} />
                            </button>
                        </div>
                    </div>

                    {menuOpen && (
                        <nav className="grid gap-1 border-t border-slate-100 px-5 py-3 lg:hidden">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    )}
                </header>

                {description && (
                    <div className="border-b border-slate-200 bg-white">
                        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                            <p className="text-sm font-semibold text-blue-700">
                                RadioTerm / {title}
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                {title}
                            </h1>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                                {description}
                            </p>
                        </div>
                    </div>
                )}

                <main className="min-h-[60vh]">{children}</main>

                <footer className="mt-12 border-t border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                        <Link href="/" className="font-semibold text-slate-700">
                            RadioTerm
                        </Link>
                        <p>Термины и определения в области радиосвязи и телекоммуникаций</p>
                        <p>© 2026 RadioTerm</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
