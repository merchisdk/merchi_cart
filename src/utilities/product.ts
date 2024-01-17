import pngProductNotFound from '../assets/product-not-found.png';

export function productFeatureImageUrl(product: any) {
  const { featureImage } = product;
  return featureImage && featureImage!.viewUrl ?
    featureImage!.viewUrl : pngProductNotFound.src;
}
