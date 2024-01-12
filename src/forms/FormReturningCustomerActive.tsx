import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tryReturningCustomer } from '../store';
import FormReturningCustomer from '../../forms/FormReturningCustomer';
import sliceFormReturningCustomer from '../../forms/slices/sliceFormReturningCustomer';

interface Props {
}

function FormReturningCustomerActive(props: Props) {
  const dispatch = useDispatch();
  const {
    returningCustomerError,
    returningCustomerLoading,
  } = useSelector((s: any) => s.stateFormReturningCustomer);
  function setReturningCustomerError(showError: boolean) {
    dispatch(
      sliceFormReturningCustomer.actions.
        setReturningCustomerError(showError));
  }
  return (
    <FormReturningCustomer
      returningCustomerError={returningCustomerError}
      returningCustomerLoading={returningCustomerLoading}
      setReturningCustomerError={
        () => setReturningCustomerError(false)}
      submit={tryReturningCustomer}
    />
  );
}

export default FormReturningCustomerActive;
