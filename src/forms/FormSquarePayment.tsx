import { useCartContext } from '../CartProvider';
import SquareCard from '../square/SquareCard';

function FormSquarePayment() {
  const { cart } = useCartContext();
  const company = cart && cart.domain && cart.domain.company;
  return (
    <>
      {Boolean(company) && company.acceptSquare && <SquareCard />}
    </>
  );
}

export default FormSquarePayment;
