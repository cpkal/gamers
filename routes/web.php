<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/payment/finish', [PaymentController::class, 'paymentFinish'])->name('payment.finish');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/create_transaction', [OrderController::class, 'createOrder'])->name('create.transaction');
    Route::get('my-orders', [OrderController::class, 'getOrders'])->name('my-orders');
    Route::get('my-orders/{id}', [OrderController::class, 'findOrder'])->name('my-orders.find');
});

require __DIR__ . '/auth.php';
