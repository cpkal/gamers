<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41zzkufEtNtca2D54yPz-Bip4x5vep1IByQ&s',
                'name' => 'PlayStation 4',
                'price' => 30000.00,
                'qty_available' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'image' => 'https://media.dinomarket.com/docs/imgTD/2024-02/DM_CA961EB8D9C88E81647BBFE7417EB9C0_210224140212_ll.jpg',
                'name' => 'PlayStation 5',
                'price' => 40000.00,
                'qty_available' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
