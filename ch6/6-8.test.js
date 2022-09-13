import { readingsOutsideRange, NumberRange } from './6-8';

test('리팩토링 전/후 결과가 같다', () => {
  const station = {
    name: 'ZB1',
    readings: [
      { temp: 47, time: '2016-11-10 09:10' },
      { temp: 53, time: '2016-11-10 09:20' },
      { temp: 58, time: '2016-11-10 09:30' },
      { temp: 53, time: '2016-11-10 09:40' },
      { temp: 51, time: '2016-11-10 09:50' },
    ],
  };

  const operationPlan = new NumberRange(51, 53);

  expect(readingsOutsideRange(station, operationPlan)).toEqual([
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 58, time: '2016-11-10 09:30' },
  ]);
});
