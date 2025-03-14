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

export const getAllLocalStorageItems = () => {
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

export const getTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Hitung selisih waktu dalam milidetik
  const diffTime = Math.abs(end - start);

  // Konversi milidetik ke hari (1 hari = 1000ms * 60s * 60m * 24h)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const getTotalWeekends = (startDate, endDate) => {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let count = 0;

  // Loop dari startDate ke endDate
  while (start <= end) {
    let day = start.getDay(); // Dapatkan hari (0 = Minggu, 6 = Sabtu)
    if (day === 0 || day === 6) {
      count++; // Tambah jika Sabtu atau Minggu
    }
    start.setDate(start.getDate() + 1); // Geser ke hari berikutnya
  }

  return count;
}