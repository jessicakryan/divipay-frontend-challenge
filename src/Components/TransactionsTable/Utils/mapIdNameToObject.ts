import { IdName } from '../../../Shared/data.types';

export const mapIdNameToObject = (arr: IdName[]): Record<string, string> =>
  arr.reduce((prev, next) => {
    return {
      ...prev,
      [next.id]: next.name,
    };
  }, {});
