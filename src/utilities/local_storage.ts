import { isBrowser } from 'browser-or-node';

export interface SavedCheckoutCustomer {
  id?: number;
  name?: string;
  emailAddress?: string;
  phoneNumbers?: Array<{ code?: string; number?: string }>;
}

export interface SavedCheckoutAddress {
  city?: string;
  country?: string;
  lineOne?: string;
  lineTwo?: string;
  postcode?: string;
  state?: string;
}

export interface SavedCheckoutDraft {
  customer?: SavedCheckoutCustomer;
  address?: SavedCheckoutAddress;
  receiverNotes?: string;
}

function storageKey(domainId: number | string) {
  return `merchi-cart-checkout-${domainId}`;
}

function readDraft(domainId?: number | string | null): SavedCheckoutDraft {
  if (!isBrowser || domainId === undefined || domainId === null) {
    return {};
  }
  try {
    const raw = localStorage.getItem(storageKey(domainId));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeDraft(domainId: number | string | undefined | null, draft: SavedCheckoutDraft) {
  if (!isBrowser || domainId === undefined || domainId === null) {
    return;
  }
  try {
    localStorage.setItem(storageKey(domainId), JSON.stringify(draft));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function getSavedCheckoutDraft(domainId?: number | string | null): SavedCheckoutDraft {
  return readDraft(domainId);
}

export function getSavedCheckoutCustomer(
  domainId?: number | string | null
): SavedCheckoutCustomer | undefined {
  return readDraft(domainId).customer;
}

export function getSavedCheckoutAddress(
  domainId?: number | string | null
): { address?: SavedCheckoutAddress; receiverNotes?: string } {
  const draft = readDraft(domainId);
  return {
    address: draft.address,
    receiverNotes: draft.receiverNotes,
  };
}

export function saveCheckoutCustomer(
  domainId: number | string | undefined | null,
  customer: SavedCheckoutCustomer
) {
  const draft = readDraft(domainId);
  const nextCustomer: SavedCheckoutCustomer = {
    ...draft.customer,
    ...customer,
  };
  // Drop empty phone entries.
  if (nextCustomer.phoneNumbers) {
    nextCustomer.phoneNumbers = nextCustomer.phoneNumbers.filter(
      (phone) => phone && (phone.number || phone.code)
    );
    if (!nextCustomer.phoneNumbers.length) {
      delete nextCustomer.phoneNumbers;
    }
  }
  writeDraft(domainId, { ...draft, customer: nextCustomer });
}

export function saveCheckoutAddress(
  domainId: number | string | undefined | null,
  address: SavedCheckoutAddress | null | undefined,
  receiverNotes?: string
) {
  if (!address) return;
  const draft = readDraft(domainId);
  const nextAddress: SavedCheckoutAddress = {
    city: address.city || '',
    country: address.country || '',
    lineOne: address.lineOne || '',
    lineTwo: address.lineTwo || '',
    postcode: address.postcode || '',
    state: address.state || '',
  };
  const next: SavedCheckoutDraft = {
    ...draft,
    address: nextAddress,
  };
  if (receiverNotes !== undefined) {
    next.receiverNotes = receiverNotes;
  }
  writeDraft(domainId, next);
}

export function addressHasContent(address?: SavedCheckoutAddress | null) {
  if (!address) return false;
  return Boolean(
    address.lineOne ||
      address.lineTwo ||
      address.city ||
      address.state ||
      address.postcode ||
      address.country
  );
}
