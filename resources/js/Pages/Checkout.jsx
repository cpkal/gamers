import { formatRupiah } from "@/lib/helper";
import { router } from "@inertiajs/react"
import { useEffect, useState } from "react";

export default function Checkout() {

  const simulateSubmit = () => {
    router.post('/create_transaction')
  }

  const [products, setProducts] = useState([]);

  const getAllLocalStorageItems = () => {
    let items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        items[key] = JSON.parse(localStorage.getItem(key)); // Parse JSON values
      } catch {
        items[key] = localStorage.getItem(key);
      }
    }
    return items;
  };

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

  return (
    <div className="p-8 p-20 flex gap-4">
      <div className="w-3/5 border-2 border-gray-400 rounded-xl p-8">
        <h1 className="text-2xl font-medium">Checkout</h1>
        <h2 className="text-lg py-4 font-medium">Billing Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2">Negara</label>
            <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2">Kota</label>
            <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara" />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="" className="mb-2">Alamat lengkap</label>
          <textarea className="border-1 border-gray-500 p-2 rounded-lg" placeholder="Negara">
          </textarea>
        </div>

        <h2 className="text-lg py-4 font-medium">Metode Pembayaran</h2>


      </div>
      <div className="w-2/5 border-2 border-gray-400 rounded-xl px-8 py-4">
        <h2 className="text-lg py-4 font-medium">Order Summary</h2>


        {products.map(product => {
          return (
            <div className="border-2 border-gray-300 p-4 rounded-xl my-2">
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
                <p>Total Hari Booking:</p>
                <p>{product.startDate}</p>
              </div>
              <div className="flex justify-between">
                <p>Biaya Tambahan (Weekend):</p>
                <p>-</p>
              </div>
            </div>
          )
        })}

        <div className="mt-6 leading-8 relative">



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