<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Order;
use App\Models\Product;
use DateTime;
use DateTimeZone;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $order_detail = $request->get('order_detail');
        $products = $request->get('products');

        $grand_total = 0; //gross amount for midtrans

        // perform ACID
        DB::beginTransaction();

        $order = new Order();
        $order->customer_name = $order_detail['customer_name'];
        $order->whatsapp_number = $order_detail['whatsapp_number'];
        $order->city = $order_detail['city'];
        $order->kecamatan = $order_detail['kecamatan'];
        $order->kelurahan = $order_detail['kelurahan'];
        $order->postal_code = $order_detail['postal_code'];
        $order->address_detail = $order_detail['address_detail'];
        $order->status = 'pending';
        $order->grand_total = 0;
        $order->user_id = $request->user()->id;
        $order->save();

        foreach ($products as $product) {
            $startDate = new DateTime($product['startDate'], new DateTimeZone("UTC"));
            $startDate->setTimezone(new DateTimeZone("Asia/Bangkok"));
            $endDate = new DateTime($product['endDate'], new DateTimeZone("UTC"));
            $endDate->setTimezone(new DateTimeZone("Asia/Bangkok"));

            $booking = new Booking();
            $booking->qty_ordered = $product['qty'];
            $booking->pick_time = $product['pickTime'];
            $booking->booking_end_date = $endDate;
            $booking->booking_start_date = $startDate;
            $booking->status = 'pending';
            $booking->product_id = $product['id'];
            $booking->order_id = $order->id;
            $booking->save();

            $productDB = Product::find($product['id']);

            // in real application, we should reduce the stock of the product here

            $totalBookingDays = countDays($startDate, $endDate);
            // $totalWeekendDays = countWeekendDays($startDate, $endDate);

            $grand_total += $productDB->price * $product['qty'] * $totalBookingDays + (isWeekend($startDate) ? 50000 : 0);
        }

        $order->grand_total = $grand_total;
        $order->save();

        $serverKey = env('MIDTRANS_SERVER_KEY');
        $base64Key = base64_encode($serverKey . ':');

        $data = [
            'transaction_details' => [
                'order_id' => 'TRX-' . $order->id,
                'gross_amount' => $grand_total,
            ],
            'customer_details' => [
                'first_name' => $order->customer_name,
                'whatsapp_number' => $order->whatsapp_number
            ],
        ];

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $base64Key,
        ])->post('https://app.sandbox.midtrans.com/snap/v1/transactions', $data);

        $responseData = $response->json();

        $order->payment_url = $responseData['redirect_url'];
        $order->save();

        DB::commit();

        return Inertia::location($responseData['redirect_url']);
    }

    public function getOrders(Request $request)
    {
        $status = $request->query('status');

        return Inertia::render('MyOrders', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'orders' => Order::with(['bookings.product'])->where('user_id', $request->user()->id)->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })->latest()->get()
        ]);
    }

    public function findOrder(Request $request, $id)
    {
        return Inertia::render('OrderConfirmation', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'order' => Order::with(['bookings.product'])->where('user_id', $request->user()->id)->where('id', $id)->first()
        ]);
    }
}
