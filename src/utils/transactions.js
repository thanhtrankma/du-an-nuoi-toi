// Initial transaction data
export const initialTransactions = [
  {
    name: 'GIAU TEN',
    amount: 17000,
    msg: 'mua hai goi Bim Bim',
    fixedHour: 15,
    fixedMin: 32,
    type: 'spend',
    baseDayOffset: 1
  },
  {
    name: 'LAI THI THU HUONG (TV MART)',
    amount: 12000,
    msg: 'Mua 2 goi Bim Bim',
    fixedHour: 15,
    fixedMin: 32,
    type: 'spend',
    baseDayOffset: 1
  },
  {
    name: 'NINH THI THUY TRANG',
    amount: 2000,
    msg: 'QR - mua keo mut',
    fixedHour: 14,
    fixedMin: 38,
    type: 'receive',
    baseDayOffset: 1
  },
  {
    name: 'NGUYEN QUOC KHANH (SOC SON)',
    amount: 2000,
    msg: 'Con co 2k thui',
    fixedHour: 12,
    fixedMin: 14,
    type: 'receive',
    baseDayOffset: 1
  },
  {
    name: 'VU VAN THAN',
    amount: 3000,
    msg: 'Cua it long vong',
    fixedHour: 10,
    fixedMin: 47,
    type: 'receive',
    baseDayOffset: 1
  },
  {
    name: 'NGUYEN VAN TUAN (Quan tap hoa)',
    amount: 15000,
    msg: 'Mua chai nuoc ngot',
    fixedHour: 20,
    fixedMin: 3,
    type: 'spend',
    baseDayOffset: 1
  },
  {
    name: 'NGUYEN KHANH LINH',
    amount: 50000,
    msg: 'NGUYEN KHANH LINH chuyen khoan',
    fixedHour: 14,
    fixedMin: 21,
    type: 'receive',
    baseDayOffset: 1
  },
  {
    name: 'VU THI YEN NHI (Quan com tam)',
    amount: 35000,
    msg: 'An com suon',
    fixedHour: 11,
    fixedMin: 38,
    type: 'spend',
    baseDayOffset: 2
  },
  {
    name: 'PHAM THI THU HA',
    amount: 20000,
    msg: 'Mua banh mi nha',
    fixedHour: 7,
    fixedMin: 12,
    type: 'receive',
    baseDayOffset: 2
  },
  {
    name: 'NGUYEN VAN LONG',
    amount: 10000,
    msg: 'NGUYEN VAN LONG chuyen tien',
    fixedHour: 16,
    fixedMin: 9,
    type: 'receive',
    baseDayOffset: 3
  },
  {
    name: 'MANH THUONG QUAN (GIAU TEN)',
    amount: 200000,
    msg: 'Cho tien dong tien hoc',
    fixedHour: 8,
    fixedMin: 4,
    type: 'receive',
    baseDayOffset: 3
  }
];

export function processTime(item) {
  if (item.dateObj) return item;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  let finalDayOffset = item.baseDayOffset;

  if (item.baseDayOffset === 0) {
    if (currentHour < item.fixedHour || (currentHour === item.fixedHour && currentMin < item.fixedMin)) {
      finalDayOffset = 1;
    }
  }

  const eventTime = new Date(now);
  eventTime.setDate(now.getDate() - finalDayOffset);
  eventTime.setHours(item.fixedHour, item.fixedMin, 0, 0);

  return { ...item, dateObj: eventTime, finalDayOffset: finalDayOffset };
}

export function calculateTotal(transactions) {
  let total = 0;
  transactions.forEach((item) => {
    if (item.type === 'receive') total += item.amount;
    else total -= item.amount;
  });
  return total;
}

