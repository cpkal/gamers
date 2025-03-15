import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BookingDialog from "./BookingDialog";
import { formatDate, formatRupiah, formatRupiahWithSesi } from "@/lib/helper";
import BadgeBookingInfo from "./BadgeBookingInfo";


export default function ProductCard({ product, productsSelected, handleSelect, handleDelete }) {
  const [show, setShow] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(product.id);
    if (storedData) {
      const { qty, pickTime, startDate, endDate } = JSON.parse(storedData);
      setQty(qty);
      setPickTime(pickTime);
      setDateRange({ startDate: new Date(startDate), endDate: new Date(endDate), key: 'selection' });
      setDateRangeString(`${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`);
      setShow(true);
    } else {
      setShow(false);
    }
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

  const handleSetDateRange = (ranges) => {
    setDateRange(ranges.selection);
    const parsed = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify({ ...parsed, startDate: ranges.selection.startDate, endDate: ranges.selection.endDate }));
    setDateRangeString(`${formatDate(new Date(ranges.selection.startDate))} - ${formatDate(new Date(ranges.selection.endDate))}`);
  };

  const handleSetPickTime = (e) => {
    const pickTime = e.target.value;

    if (pickTime < "08:00" || pickTime > "17:00") {
      setPickTime("08:00");
      return;
    }

    setPickTime(pickTime)
    const parsed = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify({ ...parsed, pickTime }));
  }

  const handleSetQty = (e) => {
    const q = Number(e.target.value);
    if (q < 1) {
      setQty(1);
      return;
    }

    if(q == 0 || q == '') {
      setQty(1);
      return;
    }

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
      <div className="max-w-sm rounded-2xl overflow-hidden border-2 ">
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
            <BadgeBookingInfo dateRangeString={dateRangeString} pickTime={pickTime} qty={qty} />
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