import * as React from 'react';
import { Suspense, lazy } from 'react';
import { useCartContext } from '../CartProvider';
import { LoadingTemplateSm } from '../components/LoadingTemplate';

const StripeCardForm = lazy(() => import('../stripe/StripeCardForm'));

function FormStripePayment() {
  const { cart } = useCartContext();
  const company = cart && cart.domain && cart.domain.company;
  if (!company) return null;
  return (
    <Suspense fallback={<LoadingTemplateSm />}>
      <StripeCardForm />
    </Suspense>
  );
}

export default FormStripePayment;
