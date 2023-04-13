import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { iDynamicFormProps } from './types';

function DynamicForm<T extends object>(
  props: iDynamicFormProps<T>
): JSX.Element {
  const { schema, inputs, handleSubmit, children } = props;

  const {
    formState,
    register,
    handleSubmit: onSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={onSubmit((data) => handleSubmit(data as T))}>
      {!!inputs
        ? inputs.map((input, index) => (
            <div>
              {input.label ? (
                <label htmlFor={input.name.toString()}>{input.label}</label>
              ) : null}
              <input
                type="text"
                id={String(input.name)}
                {...register(input.name.toString())}
                key={index}
              />
              {formState.errors[input.name]?.message ? (
                <span>
                  {JSON.stringify(formState.errors[input.name]?.message)}
                </span>
              ) : null}
            </div>
          ))
        : children}
    </form>
  );
}

export default DynamicForm;
