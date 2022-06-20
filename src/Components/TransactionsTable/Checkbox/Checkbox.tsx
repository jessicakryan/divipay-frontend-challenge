import { ReactNode } from 'react';

interface Props {
  checked: boolean;
  disabled?: boolean;
  name: string;
  children?: ReactNode;
}

export const Checkbox = ({
  checked,
  disabled = false,
  name,
  children,
}: Props) => (
  <label>
    {children}
    <input
      type="checkbox"
      name={name}
      defaultChecked={checked}
      disabled={disabled}
    />
  </label>
);
