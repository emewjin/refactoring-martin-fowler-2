// 모두 aReading 객체를 이용하는 로직
// 모두 baseRate를 이용하는 로직
import { acquireReading, baseRate } from './6-9.js';

const aReading = acquireReading();

// 관련있는 로직들이 3개의 파일로 분리
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

const basicChargeAmount = calculateBaseCharge(aReading);
