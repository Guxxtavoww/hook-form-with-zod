import React from 'react';
import { z } from 'zod';

import DynamicForm from './components/DynamicForm';

const formSchema = z.object({
  email: z
    .string()
    .email('Insira um email Válido')
    .nonempty('Email é obrigatorio'),
  password: z.string().nonempty('Senha é obrigatoria'),
});

type FormType = z.infer<typeof formSchema>;

const App: React.FC = () => {
  return (
    <div className="app">
      <DynamicForm<FormType>
        handleSubmit={(data) => console.log({ data })}
        schema={formSchema}
        inputs={[
          {
            name: 'email',
            label: 'Email',
          },
          {
            name: 'password',
            label: 'Senha',
          },
        ]}
      />
    </div>
  );
};

export default App;
