<?php
namespace App\Domain\Users\Actions;


use App\Domain\Users\Models\User;

class UpdateUserRole
{
    public function execute(User $user, string $role): User
    {
        $user->update([
            'role' => $role,
        ]);

        return $user;
    }
}
