import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

interface InputLabelTextProps {
  id: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: boolean;
  label: string;
  type: string;
  size: 'small' | 'medium';
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  style?: React.CSSProperties | undefined;
}

const InputLabelText: React.FC<InputLabelTextProps> = (props) => {
  const { id, type, onChange, error, label, size, onKeyDown, onFocus, style } = props;
  return (
    <FormControl className="custom-form-control" variant="outlined">
      <InputLabel htmlFor={id} style={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </InputLabel>
      <OutlinedInput
        style={style}
        error={error}
        size={size}
        id={id}
        type={type}
        label={label}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChange}
      />
    </FormControl>
  );
};
export default InputLabelText;
