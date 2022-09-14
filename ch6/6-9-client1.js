import { acquireReading, baseRate } from './6-9.js';

// 변수명
const aReading = acquireReading();

const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

console.log(baseCharge);
