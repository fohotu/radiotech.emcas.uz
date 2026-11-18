<?php
namespace App\Domain\Users\Actions;


use App\Domain\Users\Models\User;

class UpdateUserInfo
{
    public function execute(User $user, array $data): User
    {
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
        return $user->refresh();
    }
}
