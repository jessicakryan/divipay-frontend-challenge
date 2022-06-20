import { ChangeEventHandler } from 'react';
import { Category } from '../../../Shared/data.types';
import { CATEGORY_SELECTOR } from '../../../Shared/testIds';
import * as content from '../constants';

interface Props {
  categories: Category[];
  value: string;
  handleSelect: ChangeEventHandler;
}

export const CategorySelector = ({
  categories,
  value,
  handleSelect,
}: Props) => (
  <select
    data-testid={CATEGORY_SELECTOR}
    name="categories"
    id="category-select"
    value={value}
    onChange={handleSelect}
  >
    <option value="">{content.CATEGORY_SELECT_PROMPT}</option>
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
);
