<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\Models\User;
use Illuminate\Support\Facades\DB;

class DeleteUser
{
    public function execute(User $user): void
    {
        DB::transaction(function () use ($user) {
            $user->delete();
        });
    }
}