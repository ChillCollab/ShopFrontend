import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

interface InputLabelEmailChange {
  label:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | null
    | undefined;
  style: React.CSSProperties | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error: boolean | undefined;
  size: 'small' | 'medium' | undefined;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  value?: string;
  disabled?: boolean;
}

const InputLabelEmailChange: React.FC<InputLabelEmailChange> = ({
  label,
  style,
  onChange,
  error,
  size,
  onKeyDown,
  onFocus,
  onClick,
  value,
  disabled,
}) => {
  return (
    <FormControl className="custom-form-control" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        style={style}
        onChange={onChange}
        error={error}
        size={size}
        id="outlined-adornment-password"
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        value={value}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              edge="end"
              className="adornment-button"
            >
              <svg
                className={'adornment-icon'}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#ABABAB"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.9827 2.48176C14.4515 2.01322 15.0872 1.75 15.75 1.75C16.4131 1.75 17.049 2.0134 17.5178 2.48226C17.9867 2.95112 18.2501 3.58702 18.2501 4.25009C18.2501 4.91291 17.9869 5.54859 17.5184 6.0174C17.5182 6.01757 17.5185 6.01722 17.5184 6.0174L16.4591 7.08043C16.4318 7.12165 16.4 7.16077 16.3637 7.19709C16.328 7.23274 16.2897 7.26406 16.2493 7.29104L10.5313 13.0295C10.3906 13.1707 10.1994 13.2501 10 13.2501H7.50001C7.0858 13.2501 6.75001 12.9143 6.75001 12.5001V10.0001C6.75001 9.80071 6.8294 9.60954 6.97063 9.46881L12.7091 3.75084C12.736 3.71044 12.7674 3.67209 12.803 3.63643C12.8393 3.60011 12.8785 3.56829 12.9197 3.54098L13.9827 2.48176C13.9828 2.4816 13.9825 2.48193 13.9827 2.48176ZM13.3428 5.23689L8.25001 10.3115V11.7501H9.68857L14.7632 6.65729L13.3428 5.23689ZM15.822 5.59473L14.4054 4.17812L15.0428 3.54292C15.2304 3.35537 15.4848 3.25 15.75 3.25C16.0153 3.25 16.2696 3.35537 16.4572 3.54292C16.6447 3.73047 16.7501 3.98485 16.7501 4.25009C16.7501 4.51533 16.6447 4.76971 16.4572 4.95726L15.822 5.59473ZM3.29117 5.79125C3.74438 5.33803 4.35907 5.08342 5.00001 5.08342H5.83334C6.24756 5.08342 6.58334 5.41921 6.58334 5.83342C6.58334 6.24764 6.24756 6.58342 5.83334 6.58342H5.00001C4.7569 6.58342 4.52374 6.68 4.35183 6.85191C4.17992 7.02382 4.08334 7.25697 4.08334 7.50009V15.0001C4.08334 15.2432 4.17992 15.4764 4.35183 15.6483C4.52374 15.8202 4.7569 15.9168 5.00001 15.9168H12.5C12.7431 15.9168 12.9763 15.8202 13.1482 15.6483C13.3201 15.4764 13.4167 15.2432 13.4167 15.0001V14.1668C13.4167 13.7525 13.7525 13.4168 14.1667 13.4168C14.5809 13.4168 14.9167 13.7525 14.9167 14.1668V15.0001C14.9167 15.641 14.6621 16.2557 14.2089 16.7089C13.7556 17.1621 13.141 17.4168 12.5 17.4168H5.00001C4.35907 17.4168 3.74438 17.1621 3.29117 16.7089C2.83796 16.2557 2.58334 15.641 2.58334 15.0001V7.50009C2.58334 6.85915 2.83796 6.24446 3.29117 5.79125Z" />
              </svg>
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};

export default InputLabelEmailChange;
