import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import './switch.scss';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
}

export const MainSwitch: React.FC<SwitchProps> = (props: SwitchProps) => {
  return (
    <FormControlLabel
      onChange={props.onChange}
      control={<Switch />}
      label={props.label}
      labelPlacement="start"
      checked={props.checked}
    />
    // <Switch {...label} />
  );
};

export default MainSwitch;
