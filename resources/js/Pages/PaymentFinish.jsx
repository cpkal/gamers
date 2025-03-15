import { Head, Link } from "@inertiajs/react";

export default function PaymentFinish({ order }) {
  return (
    <>
      <Head title="Payment Success" />
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <svg className="w-24 h-24 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L9 11.586l6.293-6.293a1 1 0 0 1 1.414 0z" clip-rule="evenodd" />
        </svg>
        <h2 className="text-3xl font-bold text-gray-800 mt-6">Pembayaran Berhasil!</h2>
        <p className="text-lg text-gray-600 mt-3 text-center">Kamu melakukan <span className="text-green-500 font-bold">{order.bookings.length}</span> booking, untuk detail lanjutannya klik tombol di bawah ini</p>

        <Link href={`/my-orders/${order.id}`} className="mt-6 inline-block bg-violet-500 text-white px-8 py-3 text-lg rounded-lg shadow hover:bg-violet-600">Lihat detail booking</Link>
      </div>
    </>
  )
}