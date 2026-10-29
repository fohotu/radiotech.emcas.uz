<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\TermController;
use App\Http\Controllers\Admin\SourceController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\Admin\TechnologyCategoryController;

use App\Models\User;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');


/*

  'dsn' => 'mysql:host=127.0.0.1;dbname=term3;unix_socket=localhost:/var/mysql/mysql.sock',
    'username' => 'root',
    //'password' => '2246191fa',
    'password'=>'emcas4032019',

*/
Route::get('/', fn () => Inertia::render('Home'))
    ->name('home');

    /*
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

    */





//Route::middleware('auth')->group(function () {
   Route::get('/fake-login', function () {
        abort_unless(app()->environment('local'), 404);

        $user = User::where('email', 'test@example.com')->firstOrFail();

        Auth::login($user);

        request()->session()->regenerate();

        return redirect('/dashboard');
        
    });


   Route::get('/terms', [TermController::class, 'index'])
    ->name('terms.index'); 

   Route::get('/terms/create', [TermController::class, 'create'])
    ->name('terms.create');

    Route::post('/terms', [TermController::class, 'store'])
    ->name('terms.store');

    Route::put('/terms/{term}',[TermController::class, 'update'])
    ->name('terms.update');
    
    Route::delete('/terms/{term}', [TermController::class, 'destroy'])
    ->name('terms.destroy');

    /*
        Route::resource('terms', TermController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);
    */


    Route::get('/terms/{term}/edit', [TermController::class, 'edit'])
        ->name('terms.edit');    

    Route::post('terms/{id}/restore', [TermController::class, 'restore'])
        ->name('terms.restore');




    //Source
    Route::get('/source', [SourceController::class, 'index'])
    ->name('source.index');   
    
     Route::post('/source', [SourceController::class, 'store'])
    ->name('source.store');

    Route::put('/source/{source}',[SourceController::class, 'update'])
    ->name('source.update');

    Route::delete('/source/{source}', [SourceController::class, 'destroy'])
    ->name('source.destroy');

    //Technologie
    Route::get('/technologies', [TechnologyController::class, 'index'])
    ->name('technologies.index');



    Route::post('/technologies', [TechnologyController::class, 'store'])
    ->name('technologies.store');


    Route::put('/technologies/{technology}', [TechnologyController::class, 'update'])
    ->name('technologies.update');


    Route::delete('/technologies/{technology}', [TechnologyController::class, 'destroy'])
    ->name('technologies.destroy');


    Route::get('/technology-categories',[TechnologyCategoryController::class, 'index'])
     ->name('technology-categories.index');

    Route::post('/technology-categories',[TechnologyCategoryController::class, 'store'])
    ->name('technology-categories.store');

    Route::put('/technology-categories/{technologyCategory}',[TechnologyCategoryController::class, 'update'])
    ->name('technology-categories.update');

    Route::delete('/technology-categories/{technologyCategory}',[TechnologyCategoryController::class, 'destroy'])
    ->name('technology-categories.destroy');


//});



