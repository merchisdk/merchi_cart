import { useCartContext } from "../CartProvider";

interface Props {
  children: any;
}

export default function CartFooter({ children }: Props) {
  const { classNameCartFooter } = useCartContext();
  return (
    <div className={classNameCartFooter}>
      {children}
    </div>
  );
}
