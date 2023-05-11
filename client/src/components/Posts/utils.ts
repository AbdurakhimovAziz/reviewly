import { sortParam } from 'utils';

export const sortOptionTitleMap: Record<sortParam, string> = {
  [sortParam.DATE]: 'Recent Posts',
  [sortParam.GRADE]: 'Top Posts',
};

export const sortOptions = [sortParam.DATE, sortParam.GRADE];
export const sortOptionValueMap: Record<sortParam, string> = {
  [sortParam.DATE]: 'date',
  [sortParam.GRADE]: 'grade',
};
