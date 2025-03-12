@extends('app')

@section('main')
    <form action="{{ route('checkout') }}" method="POST">
        @csrf
        <div id="bookingModal" class="fixed inset-0 bg-black/80  hidden flex justify-center items-center">
            <div class="bg-neutral-800 p-6 rounded-2xl shadow-lg w-1/2">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Booking Produk</h2>
    
                <!-- Calendar Input -->
                <label class="block text-gray-700 dark:text-gray-300">Pilih Rentang:</label>
                <input class="w-full p-2 border rounded-lg bg-neutral-800 dark:text-white mb-3" type="text" name="daterange"
                    value="01/01/2018 - 01/15/2018" />
    
                <!-- Time Input -->
                <label class="block text-gray-700 dark:text-gray-300">Pilih Jam Pengambilan:</label>
                <input type="time" class="w-full p-2 border rounded-lg bg-neutral-800 dark:text-white mb-3">
    
                <!-- Quantity Input -->
                <label class="block text-gray-700 dark:text-gray-300">Total Pesanan:</label>
                <input type="number" min="1" class="w-full p-2 border rounded-lg bg-neutral-800 dark:text-white mb-4"
                    value="1">
    
                <!-- Buttons -->
                <div class="flex justify-between">
                    <button onclick="closeModal()" class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                        Batal
                    </button>
                    <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Konfirmasi Booking
                    </button>
                </div>
            </div>
        </div>
    </form>

    <div class="p-8 px-20 py-10">
        <div>
            <h2 class="text-3xl font-semibold">Playstation Tersedia</h2>
            <p>Pilih Playstation sesuai keinginan Anda!</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-neutral-800">
                <img class="w-full h-64 object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41zzkufEtNtca2D54yPz-Bip4x5vep1IByQ&s"
                    alt="Product Image">
                <div class="p-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">PS 4</h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300">Rp 30.000 / sesi</p>
                    <button class="mt-4 w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700"
                        onclick="openModal()">
                        Booking Sekarang
                    </button>
                </div>
            </div>

            <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-neutral-800">
                <img class="w-full h-64 object-cover"
                    src="https://media.dinomarket.com/docs/imgTD/2024-02/DM_CA961EB8D9C88E81647BBFE7417EB9C0_210224140212_ll.jpg"
                    alt="Product Image">
                <div class="p-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">PS 5</h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300">Rp 40.000 / sesi</p>
                    <button class="mt-4 w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700"
                        onclick="openModal()">
                        Booking Sekarang
                    </button>
                </div>
            </div>

        </div>

    </div>

    <script>
        function openModal() {
            document.getElementById('bookingModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('bookingModal').classList.add('hidden');
        }

        $(function() {
            $('input[name="daterange"]').daterangepicker({
                opens: 'left'
            }, function(start, end, label) {
                console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end
                    .format('YYYY-MM-DD'));
            });
        });
    </script>
@endsection
