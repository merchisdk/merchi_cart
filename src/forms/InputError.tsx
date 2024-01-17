import * as React from 'react';
import { useCartContext } from '../CartProvider';

interface InputErrorProps {
  error?: {
    message?: string;
  };
}

const InputError: React.FC<InputErrorProps> = ({ error }) => {
  const { classNameCartInputError } = useCartContext();
  if (!error || !error.message) {
    return null;
  }

  return (
    <div className={classNameCartInputError}>
      {error.message}
    </div>
  );
};

export default InputError;
