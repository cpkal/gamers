import { useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function BookingDialog({ product, show, handleClose, handleSetPickTime, handleSetQty, handleSetDateRange, pickTime,  qty, dateRange }) {
  
  return (
    <div id="bookingModal" className={`fixed inset-0 bg-black/80 ${show ? '' : 'hidden'} flex justify-center items-center`}>
      <div className="p-6 rounded-2xl shadow-lg w-full m-8 md:w-1/2 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Produk <b>{product.name}</b></h2>

        <div className="flex flex-col md:flex-row">
          <div>
            <label className="block text-gray-700 font-semibold">Pilih Tanggal:</label>
            <DateRange ranges={[dateRange]}
              onChange={handleSetDateRange}
              moveRangeOnFirstSelection={false} />
          </div>

          <div className="w-full p-4">
            <label className="block text-gray-700">Pilih Jam Pengambilan:</label>
            <input onChange={(e) => handleSetPickTime(e)} type="time" value={pickTime ?? "08.00"} min="08:00" max="17:00"  className="w-full p-2 border rounded-lg mb-3" />

            <label className="block text-gray-700">Total Pesanan:</label>
            <input onChange={(e) => handleSetQty(e)} type="number" min="1"
              className="w-full p-2 border rounded-lg mb-4"  value={qty ?? "1"} />
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={() => handleClose()} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
            Tutup
          </button>
          <div></div>
          <button onClick={() => handleClose()} className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 hover:cursor-pointer">
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}