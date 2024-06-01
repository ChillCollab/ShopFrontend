import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { InputTypes } from './inputs.types';
import React from 'react';

export const InputLabelPassword: React.FC<InputTypes<'password'>> = ({
  error,
  isShow,
  setIsShow,
  label,
  size,
  onKeyDown,
  onFocus,
  onChange,
  register,
  style,
}) => {
  return (
    <FormControl className="custom-form-control" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        style={style}
        {...register}
        onChange={onChange}
        error={error}
        size={size}
        id="outlined-adornment-password"
        type={isShow ? 'text' : 'password'}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={setIsShow} edge="end">
              {isShow ? <img src="/eye.svg" alt={'close-eye'} /> : <img src="/eye-off.svg" alt={''} />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};
