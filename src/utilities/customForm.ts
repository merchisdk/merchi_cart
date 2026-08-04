/**
 * Helpers for loading a product's published custom form bundle in cart edit.
 * Mirrors the product-embed loader: SRI script tag → window.MERCHI_PRODUCT_FORM_<id>.
 */
import type { ComponentType } from 'react';

export interface FormBundleRef {
  url: string;
  integrity?: string;
  globalName: string;
}

/** If the product has a published custom form with a compiled bundle, return
 * the info needed to load it; otherwise null (caller falls back). */
export function publishedFormBundle(product: any): FormBundleRef | null {
  const form = product?.productForm;
  if (!form || form.status !== 'published') return null;
  const version = form.activeVersion;
  if (!version || !version.compiledBundleUrl) return null;
  return {
    url: version.compiledBundleUrl,
    integrity: version.bundleSha || undefined,
    globalName: `MERCHI_PRODUCT_FORM_${form.id}`,
  };
}

/** Dynamically load a compiled form bundle and resolve its default export. */
export function loadFormBundle(
  bundle: FormBundleRef,
  opts: { timeoutMs?: number } = {},
): Promise<ComponentType<any>> {
  const { url, integrity, globalName } = bundle;
  const timeoutMs = opts.timeoutMs || 15000;
  const w = window as any;

  const existing = w[globalName] && w[globalName].default;
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (fn: (arg: any) => void, arg: any) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(arg);
    };
    const timer = setTimeout(
      () => finish(reject, new Error(`form bundle ${globalName} timed out`)),
      timeoutMs,
    );

    const script = document.createElement('script');
    script.src = url;
    if (integrity) script.integrity = integrity;
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => {
      const mod = w[globalName];
      if (mod && mod.default) finish(resolve, mod.default);
      else {
        finish(
          reject,
          new Error(`form bundle ${globalName} did not register a default export`),
        );
      }
    };
    script.onerror = () =>
      finish(reject, new Error(`failed to load form bundle ${globalName}`));
    document.head.appendChild(script);
  });
}
