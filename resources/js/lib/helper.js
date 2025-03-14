export const formatRupiah = (amount) => {
  return 'Rp' + amount.toLocaleString('id-ID');
}

export const formatRupiahWithSesi = (amount) => {
  return formatRupiah(amount) + ' / sesi';
}

export const formatDate = (date) => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};