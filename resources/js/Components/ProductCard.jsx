import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BookingDialog from "./BookingDialog";
import { formatDate, formatRupiah, formatRupiahWithSesi } from "@/lib/helper";


export default function ProductCard({ product, productsSelected, handleSelect, handleDelete }) {
  const [show, setShow] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    setShow(false);
    productsSelected.map((productSelected) => {
      if (productSelected.productId == product.id) {
        setShow(true);
        localStorage.setItem(product.id, JSON.stringify({
          qty: qty,
          pickTime: pickTime,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }));
      }
    })
  }, [productsSelected]);

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  }

  const [pickTime, setPickTime] = useState("08:00");
  const [qty, setQty] = useState(1);
  const [dateRange, setDateRange] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  );

  const [dateRangeString, setDateRangeString] = useState(null);

  // useEffect(() => {
  //   localStorage.setItem(product.id, JSON.stringify({
  //     qty: qty,
  //     pickTime: pickTime,
  //     startDate: dateRange.startDate,
  //     endDate: dateRange.endDate,
  //   }));
  // }, [pickTime, dateRange, qty]);

  const handleSetDateRange = (ranges) => {
    setDateRange(ranges.selection);
    const parsed = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify({ ...parsed, startDate: ranges.selection.startDate, endDate: ranges.selection.endDate }));
    setDateRangeString(`${formatDate(new Date(ranges.selection.startDate))} - ${formatDate(new Date(ranges.selection.endDate))}`);
  };

  const handleSetPickTime = (e) => {
    const pickTime = e.target.value;
    setPickTime(pickTime)
    const parsed = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify({ ...parsed, pickTime }));
  }

  const handleSetQty = (e) => {
    const q = e.target.value
    setQty(q);
    const parsed = JSON.parse(localStorage.getItem(product.id)) || {};
    localStorage.setItem(product.id, JSON.stringify({ ...parsed, qty: q }));
  };


  return (
    <>
      <BookingDialog
        show={isEditDialogOpen}
        product={product}
        qty={qty}
        pickTime={pickTime}
        dateRange={dateRange}
        handleClose={handleCloseEditDialog}
        handleSetPickTime={handleSetPickTime}
        handleSetQty={handleSetQty}
        handleSetDateRange={handleSetDateRange}
      />
      <div className="max-w-sm rounded-2xl overflow-hidden border-2 border-gray-400">
        <img className="w-full h-64 object-cover"
          src={product.image}
          alt="Product Image" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-lg py-2">{formatRupiahWithSesi(product.price)}</p>
          <button className={`mt-4 w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 ${show ? 'hidden' : 'block'}`} onClick={() => handleSelect(product)}>
            Booking Sekarang
          </button>

          <div className={show ? 'block' : 'hidden'}>
            <div className="flex gap-2">
              <div>
                <div className="p-1 border-2 rounded-full border-violet-600 flex gap-2 inline-block">
                  <p className="text-sm">{dateRangeString ?? '-'}</p>
                </div>
              </div>
              <div>
                <div className="p-1 border-2 rounded-full border-violet-600 inline-block">
                  <p className="text-sm">Jam {pickTime ?? "-"}</p>
                </div>
              </div>
              <div>
                <div className="p-1 border-2 rounded-full border-violet-600 inline-block">
                  <p className="text-sm">{qty ?? "-"} Qty</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="p-3 border-2 border-violet-600 bg-violet-600 rounded-lg mt-4 w-4/5 flex justify-center" onClick={() => setEditDialogOpen(true)}>
                <AiOutlineEdit color="white" size={18} />
              </button>
              <button className="p-3 border-2 border-violet-600 rounded-lg mt-4 w-1/5 flex justify-center" onClick={() => handleDelete(product)}>
                <AiOutlineDelete color="violet" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}