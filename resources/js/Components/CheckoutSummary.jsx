import { formatDate, formatRupiah, getTotalDays, getTotalWeekends, isWeekend } from "@/lib/helper";

export default function CheckoutSummary({ products, isSubmitting }) {
  const calculateSubtotal = (product) => {
    const totalBookingDays = getTotalDays(product.startDate, product.endDate);
    const qty = product.qty;

    let subtotal = product.price * qty * totalBookingDays + ( isWeekend(product.startDate) ? 50000 : 0 );

    return subtotal;
  }

  // const calculateAdditionalCostOnWeekend = (product) => {
  //   const totalBookingDaysOnWeekend = getTotalWeekends(product.startDate, product.endDate);

  //   return (totalBookingDaysOnWeekend * 50000);
  // }

  const calculateGrandTotal = (products) => {
    let grandTotal = 0;
    products.map((product) => {
      grandTotal += calculateSubtotal(product);
    })

    return grandTotal;
  }

  return (
    <div className="border-2 rounded-xl px-4 md:px-8 py-4">
      <h2 className="text-lg py-4 font-medium">Order Summary</h2>


      {products.map(product => {
        return (
          <div className="border-2 border-gray-300 p-4 rounded-xl my-2 leading-6 text-sm" key={product.id}>
            <div className="flex items-center rounded-lg py-4 max-w-md" key={product.id}>
              <img src={product.image} alt="Product Image" className="w-16 h-16 rounded-lg object-cover" />

              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">{formatRupiah(product.price)} - Qty: {product.qty} </p>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Harga Per Sesi:</p>
              <p>{formatRupiah(product.price)}</p>
            </div>
            <div className="flex justify-between">
              <p>Jumlah Pesanan:</p>
              <p>{product.qty}</p>
            </div>
            <div className="flex justify-between">
              <p>Tanggal Booking:</p>
              <p>{formatDate(new Date(product.startDate)) + ' - ' + formatDate(new Date(product.endDate))}</p>
            </div>
            <div className="flex justify-between">
              <p>Jam Pengambilan:</p>
              <p>{product.pickTime}</p>
            </div>
            <div className="flex justify-between">
              <p>Biaya Tambahan (Weekend):</p>
              <p>{formatRupiah(isWeekend(product.startDate) ? 50000 : 0)}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Subtotal:</p>
              <p>{formatRupiah(calculateSubtotal(product))}</p>
            </div>
          </div>
        )
      })}

      <div className="mt-6 leading-8 relative">



        <div className="flex justify-between font-bold px-2 text-xl">
          <p>Total:</p>
          <p>{formatRupiah(calculateGrandTotal(products))}</p>
        </div>

        <input type="submit" disabled={isSubmitting} className={`${isSubmitting ? 'bg-violet-300' : 'bg-violet-600 hover:bg-violet-700'} p-2 w-full rounded-lg text-white mt-6 hover:cursor-pointer`} placeholder={isSubmitting ? "Submitting..." : "Submit"} />
      </div>
    </div>
  )
}