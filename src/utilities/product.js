import pngProductNotFound from '../assets/product-not-found.png';
export function productFeatureImageUrl(product) {
    var featureImage = product.featureImage;
    return featureImage && featureImage.viewUrl ?
        featureImage.viewUrl : pngProductNotFound.src;
}
