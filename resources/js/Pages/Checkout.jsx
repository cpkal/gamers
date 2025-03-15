import { formatDate, formatRupiah, getAllLocalStorageItems, getTotalDays, getTotalWeekends } from "@/lib/helper";
import { Head, router } from "@inertiajs/react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const items = getAllLocalStorageItems();
    Object.keys(items).forEach((key) => {
      axios.get(`/api/products/${key}`)
        .then(res => {
          const data = res.data;

          setProducts((prevProducts) => {
            const existingIndex = prevProducts.findIndex(p => p.id === data.id);

            if (existingIndex !== -1) {
              // Update existing product
              return prevProducts.map((product, index) =>
                index === existingIndex
                  ? { ...product, ...items[key] } // Merge new data
                  : product
              );
            }

            // Add new product if not found
            return [...prevProducts, { id: data.id, image: data.image, name: data.name, price: data.price, ...items[key] }];
          });
        });

    });
  }, []);

  const calculateSubtotal = (product) => {
    const totalBookingDays = getTotalDays(product.startDate, product.endDate);
    const qty = product.qty;

    let subtotal = product.price * qty * totalBookingDays + calculateAdditionalCostOnWeekend(product);

    return subtotal;
  }

  const calculateAdditionalCostOnWeekend = (product) => {
    const totalBookingDaysOnWeekend = getTotalWeekends(product.startDate, product.endDate);

    console.log(product.startDate);
    console.log(getTotalWeekends(product.startDate, product.endDate));

    return (totalBookingDaysOnWeekend * 50000);
  }

  const calculateGrandTotal = (products) => {
    let grandTotal = 0;
    products.map((product) => {
      grandTotal += calculateSubtotal(product);
    })

    return grandTotal;
  }

  const onSubmit = async (data) => {
    try {
      await router.post('/create_transaction', {
        order_detail: data,
        products: products
      });
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isLoading } } = useForm();

  return (
    <>
      <Head title="Checkout" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-8 md:p-20 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/5">
            <div className=" border-2 border-gray-400 rounded-xl p-8">
              <h1 className="text-2xl font-medium">Checkout</h1>

              <h2 className="text-lg py-4 font-medium">Detail Pelanggan</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Nama Pelanggan</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Nama Pelanggan" {...register('customer_name', { required: true })} />
                  {errors.customer_name && <span className="text-red-500">Harus di Isi</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Nomor Whatsapp</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Nomor Whatsapp" {...register('whatsapp_number', { required: true })} />
                  {errors.whatsapp_number && <span className="text-red-500">Harus di Isi</span>}
                </div>
              </div>

              <h2 className="text-lg py-4 font-medium">Billing Address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Kota / Kabupaten</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Kota" {...register('city', { required: true })} />
                  {errors.city && <span className="text-red-500">Harus di Isi</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Kecamatan</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Kecamatan" {...register('kecamatan', { required: true })} />
                  {errors.kecamatan && <span className="text-red-500">Harus di Isi</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Kelurahan / Desa</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Kelurahan / Desa" {...register('kelurahan', { required: true })} />
                  {errors.kelurahan && <span className="text-red-500">Harus di Isi</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Kode Pos</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Kode Pos" {...register('postal_code', { required: true })} />
                  {errors.postal_code && <span className="text-red-500">Harus di Isi</span>}
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="" className="mb-2">Alamat lengkap</label>
                <textarea className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Alamat lengkap" {...register('address_detail', { required: true })}>
                </textarea>
                {errors.address_detail && <span className="text-red-500">Harus di Isi</span>}
              </div>

              <h2 className="text-lg py-4 font-medium">Metode Pembayaran</h2>


            </div>
          </div>


          <div className="w-full md:w-2/5">
            <div className=" border-2 border-gray-400 rounded-xl px-4 md:px-8 py-4">
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
                      <p>{formatRupiah(calculateAdditionalCostOnWeekend(product))}</p>
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
          </div>
        </div>
      </form>
    </>
  )
}