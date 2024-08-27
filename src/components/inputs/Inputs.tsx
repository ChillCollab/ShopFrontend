import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import './inputs.scss';
import { InputPropType } from './inputs.types';

export const InputLabelMain: React.FC<InputPropType> = ({
  error,
  type,
  label,
  size,
  register,
  style,
  onChange,
  onKeyDown,
  disabled,
  value,
  id,
}) => {
  return (
    <FormControl style={{ width: '100%' }} className="custom-form-control" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        style={style}
        {...register}
        error={error}
        size={size}
        key={'key'}
        id={id}
        type={type}
        label={label}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </FormControl>
  );
};
