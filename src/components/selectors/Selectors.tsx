import './selectors.scss';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type BaseSelectorProps = {
  label: string;
  options: Option[];
  defaultValue?: number;
  onChange?: (e: any) => void;
};

type Option = {
  id: number;
  name: string;
  value: string;
};

export const BaseSelector = (props: BaseSelectorProps) => {
  return (
    <FormControl onChange={props.onChange} className={'selector-form-control'} fullWidth>
      <InputLabel onChange={props.onChange} id={'base-select-label'}>
        {props.label}
      </InputLabel>
      <div className={'base-selector'}>
        <Select
          labelId="base-select-label"
          id="base-select"
          defaultValue={props.defaultValue}
          label={props.label}
          onChange={props.onChange}
        >
          {props.options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
};
