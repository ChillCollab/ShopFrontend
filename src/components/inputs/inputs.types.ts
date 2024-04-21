/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from 'react';

export interface InputPropsTypes {
  style?: CSSProperties;
  isShow: boolean;
  setIsShow: () => void;
  register?: any;
  error: boolean;
  label: string;
  size: 'small' | 'medium';
  onChange?: any;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
}

export type InputTypes<T extends 'email' | 'password' | 'text'> = T extends 'password'
  ? InputPropsTypes
  : Omit<InputPropsTypes, 'isShow' | 'setIsShow'>;

export type InputPropType = {
  register?: any;
  style?: CSSProperties;
  error: boolean;
  type: string;
  label: string;
  size: 'small' | 'medium';
  onChange?: any;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  disabled?: boolean | undefined;
  value?: unknown;
  itemID?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};
