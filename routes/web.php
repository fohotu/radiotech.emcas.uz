<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');







Route::get('/', fn () => Inertia::render('Home'))
    ->name('home');

Route::get('/terms', fn () => Inertia::render('Terms/Index'))
    ->name('terms.index');

Route::get('/terms/{id}', fn (int $id) => Inertia::render('Terms/Show', [
    'id' => $id,
]))
    ->whereNumber('id')
    ->name('terms.show');

Route::get('/categories', fn () => Inertia::render('Categories/Index'))
    ->name('categories.index');

Route::get('/categories/{id}', fn (int $id) => Inertia::render('Categories/Show', [
    'id' => $id,
]))
    ->whereNumber('id')
    ->name('categories.show');

Route::get('/sources', fn () => Inertia::render('Sources/Index'))
    ->name('sources.index');

Route::get('/about', fn () => Inertia::render('About'))
    ->name('about');

