import Container from "@/Components/Container";
import Navbar from "@/Components/Navbar";
import { calculateAdditionalCostOnWeekend, calculateSubtotal, formatDate, formatRupiah } from "@/lib/helper";

export default function OrderConfirmation({ auth, order }) {
  return (
    <>
      <Navbar auth={auth} />
      <Container>
        <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
        <div className="border-2 p-4 rounded-xl">
          <div className="flex justify-between">
            <div className="text-2xl font-semibold">Order #{order.id}</div>
            <div className="text-2xl font-semibold">Total: {formatRupiah(order.grand_total)}</div>
          </div>
          <div className="flex justify-between">
            <div>Tanggal pesanan: {formatRupiah(new Date(order.created_at))}</div>
            <div>Payment Status: {order.status}</div>
          </div>
          <div className="flex justify-between">
            <div>Nama Pelanggan: {order.customer_name}</div>
          </div>
          <div className="flex justify-between">
            <div>Alamat: {order.address_detail}</div>
          </div>

          <h2 className="text-xl font-semibold mt-4">Daftar Booking</h2>
          {order.bookings.map(booking => {
            const product = booking.product;
            return (
              <div className="border-2 border-gray-300 p-4 rounded-xl my-2 leading-6">
                <div className="flex items-center rounded-lg py-4 max-w-md" key={product.id}>
                  <img src={product.image} alt="Product Image" className="w-16 h-16 rounded-lg object-cover" />

                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600">{formatRupiah(product.price)} - Qty: {booking.qty_ordered} </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Harga Per Sesi:</p>
                  <p>{formatRupiah(product.price)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Jumlah Pesanan:</p>
                  <p>{booking.qty_ordered}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tanggal Booking:</p>
                  <p>{formatDate(new Date(booking.booking_start_date)) + ' - ' + formatDate(new Date(booking.booking_end_date))}</p>
                </div>
                <div className="flex justify-between">
                  <p>Jam Pengambilan:</p>
                  <p>{booking.pick_time}</p>
                </div>
              </div>

            )
          })}

          {/* payment link if not yet pay */}
          <div className="flex flex-col items-end">
            <a href={order.payment_url} className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 mt-4">
              Pay Now
            </a>
          </div>
        </div>
      </Container>
    </>
  )
}