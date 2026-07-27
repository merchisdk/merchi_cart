import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MerchiProductFormSdkExternals } from './product-form-sdk-externals';
import { loadFormBundle, publishedFormBundle } from '../utilities/customForm';
import { LoadingTemplateSm } from './LoadingTemplate';

interface Props {
  product: any;
  /** Current cart item used to hydrate quantity / selections. */
  initialJob: any;
  apiUrl?: string;
  onSave: (job: any) => void;
  /** Rendered when there is no published bundle or load/runtime fails. */
  fallback: React.ReactNode;
  /** Notifies the host when the custom form is actively rendering. */
  onActiveChange?: (active: boolean) => void;
}

/**
 * Loads a product's published custom form for cart-item edit. On any failure
 * renders `fallback` (the default merchi_product_form) so the cart stays usable.
 */
export function CustomCartProductForm({
  product,
  initialJob,
  apiUrl,
  onSave,
  fallback,
  onActiveChange,
}: Props) {
  const [Loaded, setLoaded] = useState<React.ComponentType<any> | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  const bundleKey = publishedFormBundle(product)?.url ?? '';

  useEffect(() => {
    let active = true;
    setLoaded(null);
    setFailed(false);
    setLoading(true);
    const bundle = publishedFormBundle(product);
    if (!bundle) {
      setFailed(true);
      setLoading(false);
      return;
    }
    const w = window as any;
    w.React = React;
    w.MerchiProductFormSdk = MerchiProductFormSdkExternals;
    loadFormBundle(bundle)
      .then((Component) => {
        if (active) {
          setLoaded(() => Component);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error('[merchi_cart] custom form load failed', e);
        if (active) {
          setFailed(true);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [product, bundleKey]);

  const props = useMemo(() => {
    try {
      const runtime = MerchiProductFormSdkExternals.createProductFormRuntime({
        apiUrl: apiUrl || '',
        product,
        onAddToCart: (job: any) => onSaveRef.current?.(job),
      });
      return {
        product,
        pricing: runtime.pricing,
        actions: runtime.actions,
        helpers: runtime.helpers,
      };
    } catch (e) {
      console.error('[merchi_cart] custom form props build failed', e);
      return null;
    }
  }, [product, apiUrl]);

  const isActive = !failed && !loading && !!Loaded && !!props;
  useEffect(() => {
    onActiveChangeRef.current?.(isActive);
    return () => onActiveChangeRef.current?.(false);
  }, [isActive]);

  if (loading) return <LoadingTemplateSm />;
  if (failed || !Loaded || !props) return <>{fallback}</>;

  const Shell = MerchiProductFormSdkExternals.ProductFormShell;

  return (
    <>
      {Shell ? (
        <Shell
          product={props.product}
          pricing={props.pricing}
          actions={props.actions}
          helpers={props.helpers}
          initialJob={initialJob}
          actionLabels={{ addToCart: 'Save' }}
        >
          <Loaded {...props} />
        </Shell>
      ) : (
        <Loaded {...props} />
      )}
    </>
  );
}

export default CustomCartProductForm;
