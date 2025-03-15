export default function BadgeBookingInfo({dateRangeString, pickTime, qty}) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div>
        <div className="p-1 border-2 rounded-full border-violet-600 flex gap-2 inline-block w-min-auto">
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
  )
}