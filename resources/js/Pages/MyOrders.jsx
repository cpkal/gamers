import Container from "@/Components/Container";
import Navbar from "@/Components/Navbar";
import { formatDate, formatRupiah } from "@/lib/helper";
import { Link } from "@inertiajs/react";

export default function MyOrders({ auth, orders }) {
  return (
    <>
      <Navbar auth={auth} />
      <Container>
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        <div className="flex flex-col space-y-4">
          {orders.map(order => {
            return (
              <Link href={`/my-orders/${order.id}`} key={order.id}>
                <div className="flex flex-col space-y-2 border-2 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <div className="text-lg font-semibold">Order #{order.id}</div>
                    <div className="text-lg font-semibold">Total: {formatRupiah(order.grand_total)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Tanggal pesanan: {formatDate(new Date(order.created_at))}</div>
                    <div>Payment Status: {order.status}</div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <a href={order.payment_url} className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 mt-4">
                      Pay Now
                    </a>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </>
  )
}