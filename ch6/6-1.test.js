import { printOwing } from './6-1';

test('리팩토링 이전의 값이 이후의 값과 같다', () => {
  const invoice = {
    orders: [{ amount: 2 }, { amount: 5 }],
    customer: '엘리',
  };

  expect(printOwing(invoice)).toBe('name: 엘리 amount: 7 due: 10/13/2022');
});
