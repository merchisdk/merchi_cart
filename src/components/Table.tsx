import { useCartContext } from "../CartProvider";

interface Props {
  children: any;
  className?: string;
}

export default function Table({ children, className = '' }: Props) {
  const { classNameTable } = useCartContext();
  return (
    <table className={`${classNameTable} ${className}`}>
      {children}
    </table>
  );
}
