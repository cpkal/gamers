<?php

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/receive_transaction_webhook', function(Request $request)
{
    Log::info('Midtrans Callback:', $request->all());

    // Verify the request with Midtrans API (optional but recommended)
    // $serverKey = env('MIDTRANS_SERVER_KEY');
    // $signatureKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

    // if ($signatureKey !== $request->signature_key) {
    //     return response()->json(['message' => 'Invalid signature'], 403);
    // }

    // ORDER-5
    //split order_id
    $order_id = explode('-', $request->order_id);
    $order_id = $order_id[1];

    $order = Order::where('order_id', $order_id)->first();
    // Handle the payment status update logic here
    if ($request->transaction_status == 'settlement' || $request->transaction_status == 'capture') {
        // Payment success
        //update order status
        $order->status = 'dibayar';
        $order->save();
    }
    // } elseif ($request->transaction_status == 'pending') {
    //     // Payment pending
    // } elseif ($request->transaction_status == 'cancel' || $request->transaction_status == 'deny' || $request->transaction_status == 'expire') {
    //     // Payment failed
    // }

    return response()->json(['message' => 'Success']);
});

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
