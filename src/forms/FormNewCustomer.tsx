import * as React from 'react';
import { NewCustomerForm } from '../../sign_up_customer/form';
import { createNewCustomer } from '../store';

function FormNewCustomer() {
  return (
    <NewCustomerForm
      createNewCustomer={createNewCustomer}
      showUserTermsAndConditions={true}
    />
  );
}

export default FormNewCustomer;
