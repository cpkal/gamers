<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function paymentFinish(Request $request)
    {
        $order_id = explode('-', $request->order_id);
        $order_id = $order_id[1];

        $order = Order::with('bookings.product')->where('id', $order_id)->first();

        return Inertia::render('PaymentFinish', [
            'order' => $order
        ]);
    }
}
