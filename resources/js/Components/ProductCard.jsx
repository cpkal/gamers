import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BookingDialog from "./BookingDialog";


export default function ProductCard({ product, productsSelected, handleSelect, handleDelete }) {
  const [show, setShow] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    setShow(false);
    productsSelected.map((productSelected) => {
      if (productSelected.productId == product.id) {
        setShow(true);
      }
    })
  }, [productsSelected]);

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  }

  const [pickTime, setPickTime] = useState(null);
  const [qty, setQty] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  
  const [dateRangeString, setDateRangeString] = useState(null);

  const handleSetDateRange = (ranges) => {
    setDateRange([ranges.selection]);
    console.log(dateRange);
    setDateRangeString(`${formatDate(new Date(dateRange[0].startDate))} - ${formatDate(new Date(dateRange[0].endDate))}`);
  };

  const handleSetPickTime = (e) => {
    const pickTime = e.target.value;
    setPickTime(pickTime)
    const parsed = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify({ pickTime, ...parsed }));
  }

  const handleSetQty = (e) => {
    const qty = e.target.value;
    setQty(qty);
    const parsed = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify({ qty, ...parsed }));
  }

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
          <p className="text-lg py-2">{product.price}</p>
          <button className={`mt-4 w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 ${show ? 'hidden' : 'block'}`} onClick={() => handleSelect(product)}>
            Booking Sekarang
          </button>

          <div className={show ? 'block' : 'hidden'}>
            <div className="flex gap-2">
              <div>
                <div className="p-1 border-2 rounded-full border-violet-600 flex gap-2 inline-block">
                  <p className="text-sm">{ dateRangeString ?? '-' }</p>
                </div>
              </div>
              <div>
                <div className="p-1 border-2 rounded-full border-violet-600 inline-block">
                  <p className="text-sm">Jam {pickTime ?? "-"}</p>
                </div>
              </div>
              <div>
                <div className="p-1 border-2 rounded-full border-violet-600 inline-block">
                  <p className="text-sm">{qty  ?? "-"} Qty</p>
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