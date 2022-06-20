import { CategorySelector } from './CategorySelector';
import categories from '../../../data/categories.json';
import { CATEGORY_SELECTOR } from '../../../Shared/testIds';
import {
  render,
  screen,
  fireEvent,
} from '../../../__tests__/__utils__/renderers';

describe('CategorySelector', () => {
  const props = {
    categories,
    handleSelect: jest.fn(),
    value: '',
  };

  it('should render 6 options', () => {
    render(<CategorySelector {...props} />);

    expect(screen.getAllByRole('option')).toHaveLength(6);
  });

  it('should call handleSelect when an option is selected', async () => {
    const mockHandleSelect = jest.fn();
    render(<CategorySelector {...props} handleSelect={mockHandleSelect} />);

    fireEvent.change(screen.getByTestId(CATEGORY_SELECTOR), {
      target: { value: '0f24695f-83e2-4d25-b51a-ff04638a9f42' },
    });

    expect(mockHandleSelect).toHaveBeenCalledTimes(1);
  });
});
