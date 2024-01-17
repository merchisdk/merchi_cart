import { useCartContext } from "../CartProvider";

interface Props {
  children: any;
}

export default function Table({ children }: Props) {
  const { classNameTable } = useCartContext();
  return (
    <table className={classNameTable}>
      {children}
    </table>
  );
}
