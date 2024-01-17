import { Merchi } from '../MerchiSDK/merchi';
import { encodeMerchiApiData } from './helpers';

const merchi = new Merchi()

export function makeUser(userJson: any, makeDirty?: boolean) {
  const user = new merchi.User();
  return user.fromJson(userJson, { makeDirty });
}

export function primaryEmail(user: any) {
  const { emailAddresses = [] } = user;
  return emailAddresses[0] ? emailAddresses[0].emailAddress : '';
}

export function primaryPhone(user: any) {
  const { phoneNumbers = [] } = user;
  return phoneNumbers[0] ? phoneNumbers[0].internationalFormatNumber : '';
}

export async function tryReturningCustomerEmail(urlApi: string, emailAddress: string) {
  const queryString = new URLSearchParams({email_address: emailAddress}).toString();
  const fetchOptions: any = {method: 'POST'};

  return await fetch(
    `${urlApi}user-check-email/?${queryString}`,
    fetchOptions,
  );
}

export async function createNewCustomer(urlApi: string, customerJson: any) {
  const formData = encodeMerchiApiData(customerJson);
  const fetchOptions: any = {method: 'POST', body: formData}
  return await fetch(
    `${urlApi}public_user_create/`,
    fetchOptions,
  );
}
