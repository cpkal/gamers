import Badge from "@/Components/Badge";
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/5">
            <div className="border-2 p-4 rounded-xl">
              {/* filter by status order */}
              <div className="text-lg font-semibold mb-4">Filter by Status</div>
              <div className="flex flex-col space-y-2">
                <Link href="/my-orders">
                  <a className="text-blue-500">All</a>
                </Link>
                <Link href="/my-orders?status=pending">
                  <a className="text-yellow-500">Pending</a>
                </Link>
                <Link href="/my-orders?status=paid">
                  <a className="text-green-500">Paid</a>
                </Link>
                <Link href="/my-orders?status=failed">
                  <a className="text-red-500">Failed</a>
                </Link>
                <Link href="/my-orders?status=expired">
                  <a className="text-red-500">Expired</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-full md:w-3/5">
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
                      <div>Payment Status: <Badge status={order.status} /></div>
                    </div>

                    <div className="flex flex-col items-end">
                      {order.status === 'pending' && <a href={order.payment_url} className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 mt-4">
                        Pay Now
                      </a>}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </>
  )
}