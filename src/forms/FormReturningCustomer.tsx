import * as React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { tryReturningCustomer } from '../store';
import { Button } from '../buttons';
import InputError from './InputError';
import { useCartContext } from '../CartProvider';

const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;

function FormReturningCustomer() {
  const {
    classNameBtnPrimary,
    classNameCartFormGroup,
    classNameCartFormInput,
    urlApi
  } = useCartContext();
  const {
    returningCustomerError,
    returningCustomerLoading,
  } = useSelector((s: any) => s.stateFormReturningCustomer);
  const hookForm = useForm({ defaultValues: { emailAddress: '' } });
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    register,
  } = hookForm;
  async function submit() {
    const values = getValues();
    await tryReturningCustomer(
      (urlApi as string),
      values.emailAddress
    );
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className={classNameCartFormGroup}>
        <input
          className={classNameCartFormInput}
          placeholder='info@example.com'
          type='email'
          {...register('emailAddress', {
            required: 'Email address required',
            pattern: {
              value: emailValidation,
              message: 'Invalid email address'
            }
          })}
        />
        <small>
          If you are a returning customer please use the same email
          which you used previously.
        </small>
        <InputError error={errors.emailAddress} />
        {returningCustomerError && <InputError error={returningCustomerError} />}
      </div>
      <div className={classNameCartFormGroup}>
        <Button
          className={classNameBtnPrimary}
          disabled={returningCustomerLoading}
          type='submit'
        >
          {returningCustomerLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default FormReturningCustomerActive;
