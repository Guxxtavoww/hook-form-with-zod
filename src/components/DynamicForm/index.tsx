import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { iDynamicFormProps, GenericType } from './types';

function DynamicForm<T extends GenericType>(
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
            <div key={index}>
              {input.label ? (
                <label htmlFor={input.name.toString()}>{input.label}</label>
              ) : null}
              <input
                type="text"
                id={String(input.name)}
                {...register(input.name.toString())}
              />
              {formState.errors[input.name]?.message ? (
                <span>
                  {String(formState.errors[input.name]?.message)}
                </span>
              ) : null}
            </div>
          ))
        : children}
        <button type="submit">Teste</button>
    </form>
  );
}

export default DynamicForm;
