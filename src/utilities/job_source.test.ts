import {
  JOB_SOURCE_STORAGE_KEY,
  captureAndReadJobSource,
  cartNeedsSourceUpdate,
  hasPaidClick,
} from './job_source';

describe('job source capture', () => {
  const originalLocation = window.location;
  const originalReferrer = document.referrer;

  beforeEach(() => {
    window.localStorage.clear();
    delete (window as any).location;
    (window as any).location = {
      search: '',
      pathname: '/tyvek-wristbands',
    };
    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: '',
    });
  });

  afterEach(() => {
    (window as any).location = originalLocation;
    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: originalReferrer,
    });
    window.localStorage.clear();
  });

  it('captures google ads click ids and landing path', () => {
    (window as any).location = {
      search: '?utm_source=google&utm_medium=cpc&gclid=EAIa&utm_campaign=bands',
      pathname: '/tyvek-wristbands',
    };
    const source = captureAndReadJobSource();
    expect(source.utmSource).toBe('google');
    expect(source.utmMedium).toBe('cpc');
    expect(source.utmCampaign).toBe('bands');
    expect(source.sourceClickId).toBe('EAIa');
    expect(source.sourceLanding).toBe(
      '/tyvek-wristbands?utm_source=google&utm_medium=cpc&gclid=EAIa&utm_campaign=bands'
    );
    expect(hasPaidClick(source)).toBe(true);
  });

  it('keeps first-touch UTMs unless a paid click arrives later', () => {
    (window as any).location = {
      search: '?utm_source=newsletter&utm_medium=email',
      pathname: '/',
    };
    captureAndReadJobSource();
    (window as any).location = {
      search: '?utm_source=google&utm_medium=cpc',
      pathname: '/product',
    };
    expect(captureAndReadJobSource().utmSource).toBe('newsletter');
    (window as any).location = {
      search: '?gclid=NEWCLICK&utm_source=google',
      pathname: '/product',
    };
    expect(captureAndReadJobSource().sourceClickId).toBe('NEWCLICK');
    expect(window.localStorage.getItem(JOB_SOURCE_STORAGE_KEY)).toContain('NEWCLICK');
  });

  it('knows when an existing cart still needs source fields', () => {
    expect(
      cartNeedsSourceUpdate({}, { utmSource: 'google', sourceClickId: 'x' })
    ).toBe(true);
    expect(
      cartNeedsSourceUpdate(
        { utmSource: 'google' },
        { utmSource: 'google', sourceClickId: 'x' }
      )
    ).toBe(true);
    expect(
      cartNeedsSourceUpdate(
        { utmSource: 'google', sourceClickId: 'x' },
        { utmSource: 'google', sourceClickId: 'x' }
      )
    ).toBe(false);
  });
});
