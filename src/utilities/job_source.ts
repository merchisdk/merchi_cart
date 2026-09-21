export const JOB_SOURCE_STORAGE_KEY = 'merchi_job_source';

const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'] as const;
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export interface JobSourceFields {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  sourceClickId?: string;
  sourceLanding?: string;
  sourceReferrer?: string;
}

function trimTo(value: string | null | undefined, limit: number): string | undefined {
  if (!value) return undefined;
  const text = value.trim().slice(0, limit);
  return text || undefined;
}

function readSearchParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
}

function readStoredSource(): JobSourceFields | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(JOB_SOURCE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as JobSourceFields;
  } catch {
    return null;
  }
}

function writeStoredSource(source: JobSourceFields) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(JOB_SOURCE_STORAGE_KEY, JSON.stringify(source));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

function currentLanding(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const path = `${window.location.pathname || '/'}${window.location.search || ''}`;
    return trimTo(path, 512);
  } catch {
    return undefined;
  }
}

function currentReferrer(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  try {
    return trimTo(document.referrer, 512);
  } catch {
    return undefined;
  }
}

export function sourceFromLocation(): JobSourceFields {
  const params = readSearchParams();
  const source: JobSourceFields = {
    utmSource: trimTo(params.get('utm_source'), 256),
    utmMedium: trimTo(params.get('utm_medium'), 256),
    utmCampaign: trimTo(params.get('utm_campaign'), 256),
    utmContent: trimTo(params.get('utm_content'), 256),
    utmTerm: trimTo(params.get('utm_term'), 256),
    sourceLanding: currentLanding(),
    sourceReferrer: currentReferrer(),
  };
  for (const key of CLICK_ID_PARAMS) {
    const value = trimTo(params.get(key), 256);
    if (value) {
      source.sourceClickId = value;
      break;
    }
  }
  return source;
}

export function hasPaidClick(source: JobSourceFields | null | undefined): boolean {
  return Boolean(source?.sourceClickId);
}

export function hasSourceData(source: JobSourceFields | null | undefined): boolean {
  if (!source) return false;
  return Boolean(
    source.utmSource ||
      source.utmMedium ||
      source.utmCampaign ||
      source.utmContent ||
      source.utmTerm ||
      source.sourceClickId ||
      source.sourceLanding ||
      source.sourceReferrer
  );
}

export function captureAndReadJobSource(): JobSourceFields {
  const incoming = sourceFromLocation();
  const stored = readStoredSource();
  if (hasPaidClick(incoming) || !hasSourceData(stored)) {
    const next = {
      ...(stored || {}),
      ...Object.fromEntries(
        Object.entries(incoming).filter(([, value]) => Boolean(value))
      ),
    } as JobSourceFields;
    if (hasSourceData(next)) writeStoredSource(next);
    return next;
  }
  return stored || incoming;
}

export function jobSourceFieldsForApi(source?: JobSourceFields | null): JobSourceFields {
  const resolved = source || captureAndReadJobSource();
  const out: JobSourceFields = {};
  (Object.keys(resolved) as Array<keyof JobSourceFields>).forEach((key) => {
    const value = resolved[key];
    if (value) out[key] = value;
  });
  return out;
}

export function cartNeedsSourceUpdate(
  cart: { utmSource?: string; sourceClickId?: string; sourceChannel?: string } | null | undefined,
  source: JobSourceFields
): boolean {
  if (!hasSourceData(source)) return false;
  if (!cart?.utmSource && !cart?.sourceClickId && !cart?.sourceChannel) return true;
  return Boolean(source.sourceClickId && !cart?.sourceClickId);
}

export const JOB_SOURCE_URL_KEYS = [...UTM_PARAMS, ...CLICK_ID_PARAMS];

export function appendJobSourceToFormData(
  data: FormData,
  source?: JobSourceFields | null
): FormData {
  const fields = jobSourceFieldsForApi(source);
  (Object.keys(fields) as Array<keyof JobSourceFields>).forEach((key) => {
    const value = fields[key];
    if (value) data.append(key, value);
  });
  return data;
}
