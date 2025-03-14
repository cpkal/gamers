<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});

Route::post('/create_transaction', function () {
    $serverKey = env('MIDTRANS_SERVER_KEY');
    $base64Key = base64_encode($serverKey . ':');

    $data = [
        'transaction_details' => [
            'order_id' => 'ORDER-' . time(),
            'gross_amount' => 100,
        ],
        'customer_details' => [
            'first_name' => 'haikal',
            'email' => 'haikalg2003@gmail.com',
        ],
    ];

    $response = Http::withHeaders([
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Basic ' . $base64Key,
    ])->post('https://app.sandbox.midtrans.com/snap/v1/transactions', $data);

    $responseData = $response->json();

    return Inertia::location($responseData['redirect_url']);

});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
