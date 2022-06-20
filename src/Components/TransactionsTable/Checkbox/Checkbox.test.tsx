import { render, screen } from '../../../__tests__/__utils__/renderers';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should mark checkbox as checked by default when checked is true', () => {
    render(<Checkbox checked={true} name={'mockName'} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should mark as disabled when disabled is true', () => {
    render(<Checkbox checked={false} disabled name={'mockName'} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
