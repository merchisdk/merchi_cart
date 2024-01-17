export function companyPrimaryAddress(company: any) {
  return company && company.addresses ? company.addresses[0] : undefined;
}

export function companyStripePubKeyOrTestPubKey(company: any) {
  return company.isTesting ? company.stripePublishableTestKey :
    company.stripePublishableKey;
}
