import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { InputTypes } from './inputs.types';

const InputLabelEmail: React.FC<InputTypes<'email'>> = (props) => {
  const { onChange, error, label, size, onKeyDown, onFocus, register, style } = props;
  return (
    <FormControl className="custom-form-control" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        style={style}
        {...register}
        error={error}
        size={size}
        id="outlined-adornment-password"
        type="email"
        label={label}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChange}
      />
    </FormControl>
  );
};
export default InputLabelEmail;
