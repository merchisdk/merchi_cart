import { useCartContext } from "../CartProvider";

interface Props {
  height?: number;
}

export default function LoadingTemplate({ height }: Props) {
  const {
    classNameLoadingTemplate,
    classNameLoadingTemplateContainer,
  } = useCartContext();
  const style = height ? { height } : {};
  return (
    <div className={classNameLoadingTemplateContainer} style={style}>
      <div className={classNameLoadingTemplate} />
    </div>
  );
}

export function LoadingTemplateSm() {
  return <LoadingTemplate height={300} />;
}
