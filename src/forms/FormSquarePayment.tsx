import * as React from 'react';
import { Suspense, lazy } from 'react';
import { useCartContext } from '../CartProvider';
import { LoadingTemplateSm } from '../components/LoadingTemplate';

const SquareCard = lazy(() => import('../square/SquareCard'));

function FormSquarePayment() {
  const { cart } = useCartContext();
  const company = cart && cart.domain && cart.domain.company;
  if (!company?.acceptSquare) return null;
  return (
    <Suspense fallback={<LoadingTemplateSm />}>
      <SquareCard />
    </Suspense>
  );
}

export default FormSquarePayment;
