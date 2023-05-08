import { HTMLInputTypeAttribute } from 'react';

export type formFieldType<T> = Record<keyof T, FormFieldConfig>;

export type FormFieldConfig = {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  autocomplete: string;
  autofocus?: boolean;
  errorMsg?: string;
};
