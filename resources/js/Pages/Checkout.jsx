import CheckoutSummary from "@/Components/CheckoutSummary";
import { formatDate, formatRupiah, getAllLocalStorageItems, getTotalDays, getTotalWeekends } from "@/lib/helper";
import { Head, Link, router } from "@inertiajs/react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";

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

  const onSubmit = async (data) => {
    try {
      if (products.length === 0) {
        alert("Anda belum memilih produk");
        return;
      }

      // if startdate and enddate same, give alert
      const isSameDate = products.some(product => product.startDate === product.endDate);
      if (isSameDate) {
        alert("Tanggal booking tidak boleh sama / minimal 1 sesi");
        return;
      }

      router.post('/create_transaction', {
        order_detail: data,
        products: products
      });
      localStorage.clear();
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  return (
    <>
      <Head title="Checkout" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-8 md:p-20 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/5">
            <div className=" border-2 rounded-xl p-8">
              <div className="flex justify-between">
                <h1 className="text-2xl font-medium">Checkout</h1>

                {/* go back */}
                <Link href="/" className="flex items-center"><AiOutlineArrowLeft /> Kembali</Link>
              </div>

              <h2 className="text-lg py-4 font-medium">Detail Pelanggan</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Nama Pelanggan</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="John Doe" {...register('customer_name', { required: "Nama Pelanggan wajib diisi" })} />
                  {errors.customer_name && <span className="text-red-500">{errors.customer_name.message}</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-2">Nomor Whatsapp</label>
                  <input className="border-1 border-gray-500 p-2 rounded-lg" placeholder="0891234567" {...register('whatsapp_number', {
                    required: "Nomor WhatsApp wajib diisi", pattern: {
                      value: /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
                      message: "Nomor WhatsApp tidak valid",
                    }
                  })} />
                  {errors.whatsapp_number && <span className="text-red-500">{errors.whatsapp_number.message}</span>}
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
              {/* semua metode pembayaran tersedia */}
              <h3>Tersedia semua pembayaran (Bank transfer, E-Wallet, Credit Card, Retail, PayLater)</h3>
              <h3>Klik "Submit" untuk memilih pembayaran</h3>

            </div>
          </div>

          <div className="w-full md:w-2/5">
            <CheckoutSummary products={products} isSubmitting={isSubmitting} />
          </div>
        </div>
      </form>
    </>
  )
}