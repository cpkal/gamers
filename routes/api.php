<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products/{id}', function($id) {
    return Product::find($id);
});

Route::post('/checkout-summary', function(Request $request) {
    $total = 0;

    foreach ($request->all() as $key => $value) {
        $product = Product::find($key);
        $total += $product->price * $request->get($key)['qty'];
    }
    
    return $total;
});

// Route::get('/checkout-full')
