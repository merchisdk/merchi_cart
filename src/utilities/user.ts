export function primaryEmail(user: any) {
  const { emailAddresses = [] } = user;
  return emailAddresses[0] ? emailAddresses[0].emailAddress : '';
}

export function primaryPhone(user: any) {
  const { phoneNumbers = [] } = user;
  return phoneNumbers[0] ? phoneNumbers[0].internationalFormatNumber : '';
}
