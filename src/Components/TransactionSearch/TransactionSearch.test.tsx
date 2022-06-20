import { render, screen, fireEvent } from '../../__tests__/__utils__/renderers';
import { TransactionSearch } from './TransactionSearch';

describe('TransactionSearch', () => {
  const props = {
    handleChange: jest.fn(),
    searchValue: '',
  };

  it('should call handleChange when a value is typed in search bar', async () => {
    const mockHandleChange = jest.fn();
    render(<TransactionSearch {...props} handleChange={mockHandleChange} />);

    const searchBox = screen.getByRole('textbox');

    fireEvent.change(searchBox, { target: { value: 'ww' } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });
});
