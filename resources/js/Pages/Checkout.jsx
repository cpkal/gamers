import { router } from "@inertiajs/react"

export default function Checkout() {

  const simulateSubmit = () => {
    router.post('/create_transaction')
  }

  return (
    <div className="p-8 p-20 flex gap-4">
      <div className="w-3/5 border-2 border-gray-400 rounded-xl p-8">
        <h1 className="text-2xl font-medium">Checkout</h1>
        <h2 className="text-lg py-4 font-medium">Billing Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label for="" className="mb-2">Negara</label>
            <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
          </div>
          <div className="flex flex-col">
            <label for="" className="mb-2">Kota</label>
            <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label for="" className="mb-2">Alamat lengkap</label>
          <textarea className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara">
          </textarea>
        </div>

        <h2 className="text-lg py-4 font-medium">Metode Pembayaran</h2>
        

      </div>
      <div className="w-2/5 border-2 border-gray-400 rounded-xl px-8 py-4">
        <h2 className="text-lg py-4 font-medium">Order Summary</h2>

        <div className="flex items-center rounded-lg py-4 max-w-md">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41zzkufEtNtca2D54yPz-Bip4x5vep1IByQ&s" alt="Product Image" className="w-16 h-16 rounded-lg object-cover" />

            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-800">PlayStation 4 + 2 Stick + 3 Games</h2>
              <p className="text-gray-600">Rp 100.000</p>
            </div>
        </div>

        <div className="mt-6 leading-8 relative">
          <div className="flex justify-between">
            <p>Harga Per Sesi:</p>
            <p>Rp40,000</p>
          </div>
          <div className="flex justify-between">
            <p>Total Hari Booking:</p>
            <p>3</p>
          </div>
          <div className="flex justify-between">
            <p>Biaya Tambahan (Weekend):</p>
            <p>Rp50,000</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total:</p>
            <p>Rp.170,000</p>
          </div>

          <button onClick={() => simulateSubmit()} className="p-2 w-full rounded-lg bg-violet-600 text-white mt-6">Bayar Sekarang</button>
        </div>
      </div>
    </div>
  )
}