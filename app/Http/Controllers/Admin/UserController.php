<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Users\Models\User;
use App\Domain\Users\Actions\CreateUser;
use App\Domain\Users\Actions\UpdateUser;
use App\Domain\Users\Actions\DeleteUser;
use App\Domain\Users\Actions\UpdateUserStatus;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Requests\Users\UpdateUserStatusRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


use App\Domain\Users\Actions\UpdateUserInfo;
use App\Domain\Users\Actions\UpdateUserPassword;
use App\Domain\Users\Actions\UpdateUserRole;

use App\Http\Requests\Users\UpdateUserInfoRequest;
use App\Http\Requests\Users\UpdateUserPasswordRequest;
use App\Http\Requests\Users\UpdateUserRoleRequest;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->select('id', 'name', 'email', 'role', 'created_at','status')
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





    public function updateInfo(UpdateUserInfoRequest $request,User $user,UpdateUserInfo $action): RedirectResponse 
    {
        $action->execute($user, $request->validated());
        return back()->with('success', 'User information updated successfully.');
    }

    public function updatePassword(
        UpdateUserPasswordRequest $request,
        User $user,
        UpdateUserPassword $action
    ): RedirectResponse {
        $action->execute(
            $user,
            $request->validated('password')
        );

        return back()->with('success', 'Password updated successfully.');
    }

    public function updateRole(UpdateUserRoleRequest $request,User $user,UpdateUserRole $action): RedirectResponse {
        $action->execute(
            $user,
            $request->validated('role')
        );

        return back()->with('success', 'User role updated successfully.');
    }


     public function updateStatus(UpdateUserStatusRequest $request,User $user,UpdateUserStatus $action): RedirectResponse {
        $action->execute(
            $user,
            $request->validated('status')
        );

        return back()->with('success', 'User status updated successfully.');
    }

}