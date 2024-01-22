export function companyPrimaryAddress(company) {
    return company && company.addresses ? company.addresses[0] : undefined;
}
export function companyStripePubKeyOrTestPubKey(company) {
    return company.isTesting ? company.stripePublishableTestKey :
        company.stripePublishableKey;
}
