import * as React from 'react';
import { FacebookClientForm } from '../../login/LoginFacebookClient';
import { alertError, facebookLoginSuccess } from '../store';

function FormFacebookCustomer() {
  return (
    <FacebookClientForm
      errorCallback={(e: any) => alertError(e.message)}
      successCallback={facebookLoginSuccess}
    />
  );
}

export default FormFacebookCustomer;
