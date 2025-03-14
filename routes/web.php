<?php

use App\Http\Controllers\ProfileController;
use App\Models\Booking;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
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
        'products' => Product::all()
    ]);
});

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});

Route::post('/create_transaction', function (Request $request) {
    $order_detail = $request->get('order_detail');
    $products = $request->get('products');

    $grand_total = 0; //gross amount on midtrans

    return $request->all();

    $order = new Order();
    $order->customer_name = $order_detail['customer_name'];
    $order->whatsapp_number = $order_detail['whatsapp_number'];
    $order->city = $order_detail['city'];
    $order->kecamatan = $order_detail['kecamatan'];
    $order->kelurahan = $order_detail['kelurahan'];
    $order->postal_code = $order_detail['postal_code'];
    $order->address_detail = $order_detail['address_detail'];
    $order->status = 'belum_dibayar';
    $order->save();

    foreach ($products as $product) {
        $booking = new Booking();
        $booking->qty_ordered = $product->qty;
        $booking->pick_time = $product->pickTime;
        $booking->booking_end_date = $product->endDate;
        $booking->booking_start_date = $product->startDate;
        $booking->status = 'pending';
        $booking->product_id = $product->id;
        $booking->save();

        $productDB = Product::find($product['id']);
        $startDate = new DateTime($product['startDate']);
        $endDate = new DateTime($product['endDate']);

        $diff = $startDate->diff($endDate);
        $totalBookingDays = $diff->days;


        // let subtotal = product.price * qty * totalBookingDays + calculateAdditionalCostOnWeekend(product);  
        $grand_total += $productDB->price * $product->qty * $totalBookingDays + ($totalBookingDaysOnWeekend * 50000);
    }

    $serverKey = env('MIDTRANS_SERVER_KEY');
    $base64Key = base64_encode($serverKey . ':');

    $data = [
        'transaction_details' => [
            'order_id' => 'ORDER-' . $order->id,
            'gross_amount' => $grand_total,
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
