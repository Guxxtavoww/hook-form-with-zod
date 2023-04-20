import { useMemo } from 'react';
import { useForm, FormProvider, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { iDynamicFormProps, GenericType } from './types';

function DynamicForm<T extends GenericType>(
  props: iDynamicFormProps<T>
): JSX.Element {
  const { schema, inputs, handleSubmit, children } = props;

  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  const {
    formState,
    register,
    handleSubmit: onSubmit,
  } = useMemo(() => form, [form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit((data) => handleSubmit(data as T))}>
        {!!inputs
          ? inputs.map((input, index) => (
              <div key={index}>
                {input.label ? (
                  <label htmlFor={input.name.toString()}>{input.label}</label>
                ) : null}
                <input
                  type="text"
                  id={String(input.name)}
                  {...register(input.name.toString() as Path<T>)}
                />
                {formState.errors[input.name]?.message ? (
                  <span>{String(formState.errors[input.name]?.message)}</span>
                ) : null}
              </div>
            ))
          : children}
        <button type="submit">Teste</button>
      </form>
    </FormProvider>
  );
}

export default DynamicForm;
