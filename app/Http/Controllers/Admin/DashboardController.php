<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

// Подключите реальные модели вашего проекта после сверки namespace и схемы БД.
// Например:
// use App\Domain\Terms\Models\Term;
// use App\Domain\Technologies\Models\Technology;
// use App\Models\User;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        /*
         * Ниже — структура данных для React-страницы.
         * Замените демонстрационные значения реальными запросами к вашим моделям.
         *
         * Важно: visits требует таблицы аналитики/логов посещений.
         * Не считайте посещения по количеству HTTP-запросов без фильтрации ботов,
         * статических файлов и повторных запросов.
         */

        $stats = [
            'terms' => 0,
            'visits' => 0,
            'technologies' => 0,
            'users' => 0,
            'translations' => 0,
            'published' => 0,
            'drafts' => 0,
            'pending' => 0,
            'incompleteTranslations' => 0,
        ];

        // Пример после подключения моделей:
        // $stats['terms'] = Term::query()->count();
        // $stats['published'] = Term::query()->where('status', 'published')->count();
        // $stats['drafts'] = Term::query()->where('status', 'draft')->count();
        // $stats['technologies'] = Technology::query()->count();
        // $stats['users'] = User::query()->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'visits' => [],
            'termLanguages' => [],
            'recentTerms' => [],
            'popularTerms' => [],
            'recentActivity' => [],
        ]);
    }
}
