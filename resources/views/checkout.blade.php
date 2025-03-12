@extends('app')

@section('main')
    <div class="p-8 p-20 flex gap-4">
        <div class="w-3/5 bg-neutral-800 rounded-xl p-8">
            <h1 class="text-2xl font-medium">Checkout</h1>
            <h2 class="text-lg py-4 font-medium">Billing Address</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <label for="" class="mb-2">Negara</label>
                    <input class="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
                </div>
                <div class="flex flex-col">
                    <label for="" class="mb-2">Kota</label>
                    <input class="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
                </div>
            </div>
            <div class="flex flex-col mt-4">
                <label for="" class="mb-2">Alamat lengkap</label>
                <textarea class="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara">
                </textarea>
            </div>

            <h2 class="text-lg py-4 font-medium">Billing Address</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <label for="" class="mb-2">Negara</label>
                    <input class="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
                </div>
                <div class="flex flex-col">
                    <label for="" class="mb-2">Kota</label>
                    <input class="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
                </div>
            </div>

        </div>
        <div class="w-2/5 bg-neutral-800 rounded-xl px-8 py-4">
            <h2 class="text-lg py-4 font-medium">Order Summary</h2>

            <div class="flex items-center rounded-lg py-4 max-w-md">
                <!-- Image on the Left -->
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41zzkufEtNtca2D54yPz-Bip4x5vep1IByQ&s" alt="Product Image" class="w-16 h-16 rounded-lg object-cover">

                <!-- Product Details on the Right -->
                <div class="ml-4 flex-1">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">PlayStation 4 + 2 Stick + 3 Games</h2>
                    <p class="text-gray-600 dark:text-gray-300">Rp 100.000</p>
                </div>
            </div>

            <div class="mt-6 leading-8 relative">
                <div class="flex justify-between">
                    <p>Harga Per Sesi:</p>
                    <p>Rp40,000</p>
                </div>
                <div class="flex justify-between">
                    <p>Total Hari Booking:</p>
                    <p>3</p>
                </div>
                <div class="flex justify-between">
                    <p>Biaya Tambahan (Weekend):</p>
                    <p>Rp50,000</p>
                </div>
                <div class="flex justify-between font-bold">
                    <p>Total:</p>
                    <p>Rp.170,000</p>
                </div>

                <button class="p-2 w-full rounded-lg bg-violet-600 mt-6">Bayar Sekarang</button>
            </div>
        </div>
    </div>
@endsection
