import { useCartContext } from "../CartProvider";

export default function LoadingTemplate() {
  const {
    classNameLoadingTemplate,
    classNameLoadingTemplateContainer,
  } = useCartContext();
  return (
    <div className={classNameLoadingTemplateContainer}>
      <div className={classNameLoadingTemplate} />
    </div>
  );
}
