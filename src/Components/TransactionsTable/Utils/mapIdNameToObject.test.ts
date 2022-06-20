import { mapIdNameToObject } from './mapIdNameToObject';

const mockIdNameArray = [
  {
    id: 'mockId1',
    name: 'mockName1',
  },
  {
    id: 'mockId2',
    name: 'mockName2',
  },
];

describe('mapIdNameToObject', () => {
  it('should map to an expected object', () => {
    const expected = {
      mockId1: 'mockName1',
      mockId2: 'mockName2',
    };

    expect(mapIdNameToObject(mockIdNameArray)).toEqual(expected);
  });
});
