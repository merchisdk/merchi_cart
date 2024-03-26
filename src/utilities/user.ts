import { Merchi } from 'merchi_sdk_ts';

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


export async function tryReturningCustomerEmail(emailAddress: string) {
  const merchi = new Merchi();
  const query: Array<any> = [];
  query.push(['email_address', emailAddress]);
  return await merchi.authenticatedFetch('/user-check-email/', {method: 'POST', query});
}

export async function createNewCustomer(customerJson: any) {
  const user = makeUser(customerJson, true);
  return merchi.authenticatedFetch(
    '/public_user_create/', {body: user.toFormData(), method: 'POST'}
  )
}
