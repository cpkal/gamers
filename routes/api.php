<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\MidtransWebhookPaymentNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/receive_transaction_webhook', [MidtransWebhookPaymentNotification::class, '__invoke']);
Route::get('/products/{id}', [ProductController::class, 'show']);