import { useCartContext } from '../CartProvider';
import StripeCardForm from '../stripe/StripeCardForm';

function FormStripePayment() {
  const { cart } = useCartContext();
  const company = cart && cart.domain && cart.domain.company;
  return (
    <>
      {Boolean(company) && <StripeCardForm />}
    </>
  );
}

export default FormStripePayment;
