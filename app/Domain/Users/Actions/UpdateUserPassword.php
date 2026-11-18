<?php
namespace App\Domain\Users\Actions;

use App\Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateUserPassword
{
    public function execute(User $user, string $password): User
    {
        $user->update([
            'password' => Hash::make($password),
        ]);
        return $user;
    }
}
