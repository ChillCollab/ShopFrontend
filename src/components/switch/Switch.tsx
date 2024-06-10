import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import './switch.scss';

interface SwitchProps {
  label?: string;
  checked?: boolean;
}

export const MainSwitch: React.FC<any> = (props: SwitchProps) => {
  return (
    <FormControlLabel control={<Switch />} label={props.label} labelPlacement="start" checked={props.checked} />
    // <Switch {...label} />
  );
};

export default MainSwitch;
