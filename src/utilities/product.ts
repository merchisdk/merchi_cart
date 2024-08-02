import { Merchi } from 'merchi_sdk_ts';
import pngProductNotFound from '../assets/product-not-found.png';

export function productFeatureImageUrl(product: any) {
  const { featureImage } = product;
  return featureImage && featureImage!.viewUrl ?
    featureImage!.viewUrl : pngProductNotFound.src || pngProductNotFound;
}

const merchi = new Merchi();

export const makeProduct = (json: any, makeDirty?: boolean) => {
  const merchi = new Merchi();
  const product = new merchi.Product();
  return product.fromJson(json, { makeDirty });
};
