<?php
namespace App\Domain\Users\Actions;


use App\Domain\Users\Models\User;

class UpdateUserStatus
{
    public function execute(User $user, string $status): User
    {
        $user->update([
            'status' => $status,
        ]);
        return $user;
    }
}
