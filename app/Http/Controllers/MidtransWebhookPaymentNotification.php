<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class MidtransWebhookPaymentNotification extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Verify the request with Midtrans API (optional but recommended)
        $serverKey = env('MIDTRANS_SERVER_KEY');
        $signatureKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        if ($signatureKey !== $request->signature_key) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $order_id = explode('-', $request->order_id);
        $order_id = $order_id[1];

        $order = Order::where('id', $order_id)->first();
        
        if ($request->transaction_status == 'settlement') {
            $order->status = 'paid';
            $order->save();
        }

        if ($request->transaction_status == 'capture') {
            if ($request->fraud_status == 'accept') {
                $order->status = 'paid';
                $order->save();
            }
        }

        if ($request->transaction_status == 'cancel') {
            $order->status = 'failed';
            $order->save();
        }

        if ($request->transaction_status == 'expire') {
            $order->status = 'expired';
            $order->save();
        }

        if ($request->transaction_status == 'pending') {
            $order->status = 'pending';
            $order->save();
        }

        return response()->json(['message' => 'Success']);
    }
}
