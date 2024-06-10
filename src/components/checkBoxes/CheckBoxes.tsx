import React from 'react';
import { Checkbox } from '@mui/material';
import './checkbox.scss';

interface CheckBox {
  size: 'small' | 'medium' | 'large';
}

export const CCheckBox: React.FC<CheckBox> = ({ size }) => {
  return <Checkbox size={size} style={{ margin: 0 }} />;
};
