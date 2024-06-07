import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import './inputs.scss';

interface InputLabelClean {
  label:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | null
    | undefined;
  style: React.CSSProperties | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  size: 'small' | 'medium' | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  value?: string;
  disabled?: boolean;
}

export const InputLabelPasswordClean: React.FC<InputLabelClean> = ({
  label,
  style,
  onChange,
  size,
  onKeyDown,
  onFocus,
  disabled,
  value,
}) => {
  return (
    <FormControl className="custom-form-control" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        disabled={disabled}
        style={style}
        onChange={onChange}
        size={size}
        value={value}
        id="outlined-adornment-password"
        type={'password'}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        label={label}
      />
    </FormControl>
  );
};
