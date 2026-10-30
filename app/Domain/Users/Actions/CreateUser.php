<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\Models\User;
use Illuminate\Support\Facades\DB;

class CreateUser
{
    public function execute(array $data): User
    {
        return DB::transaction(function () use ($data) {
            return User::create($data);
        });
    }
}