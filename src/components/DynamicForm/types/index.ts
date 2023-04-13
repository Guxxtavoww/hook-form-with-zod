import React from 'react';
import { z } from 'zod';

export interface iDynamicFormProps<T extends object> {
  inputs?: iInputProps<T>[];
  schema: z.Schema<T>;
  children?: React.ReactNode;
  handleSubmit: (data: T) => void | Promise<void>;
}

export interface iInputProps<T> {
  name: keyof T;
  label?: string;
}
