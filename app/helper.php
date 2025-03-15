<?php

if (!function_exists('testHelperFunction')) {
  function testHelperFunction()
  {
    return "Hello, World!";
  }
}

if (!function_exists('countWeekendDays')) {
  function countWeekendDays($startDate, $endDate)
  {

    $count = 0;

    // Loop dari startDate ke endDate
    while ($startDate <= $endDate) {
      $day = $startDate->format('w'); // Dapatkan hari (0 = Minggu, 6 = Sabtu)
      if ($day == 0 || $day == 6) {
        $count++; // Tambah jika Sabtu atau Minggu
      }
      $startDate->modify('+1 day'); // Geser ke hari berikutnya
    }

    return $count;
  }
}

if (!function_exists('countDays')) {
  function countDays($startDate, $endDate)
  {
    $diff = $startDate->diff($endDate);
    return $diff->days;
  }
}
