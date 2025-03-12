<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('products');
});

Route::any('checkout', function() {
    return view('checkout');
})->name('checkout');