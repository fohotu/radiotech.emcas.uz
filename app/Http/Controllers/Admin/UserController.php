<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Users\Models\User;
use App\Domain\Users\Actions\CreateUser;
use App\Domain\Users\Actions\UpdateUser;
use App\Domain\Users\Actions\DeleteUser;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->select('id', 'name', 'email', 'role', 'created_at')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

           
        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);

    }

    public function store(StoreUserRequest $request,CreateUser $action): RedirectResponse {
        $action->execute($request->validated());
        return back()->with('success', 'User created successfully.');
    }

    public function update(UpdateUserRequest $request,User $user,UpdateUser $action): RedirectResponse {
        $data = $request->validated();
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $action->execute($user, $data);
        return back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user,DeleteUser $action): RedirectResponse {
        $action->execute($user);
        return back()->with('success', 'User deleted successfully.');
    }
}