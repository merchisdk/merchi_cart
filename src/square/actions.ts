import { Merchi } from '../MerchiSDK/merchi';
import sliceSquareAlerts from './slices/sliceSquareAlerts';
import sliceSquareForm from './slices/sliceSquareForm';

const { alertError } = sliceSquareAlerts.actions;

type DispatchInterface = (action: any) => void;

export function actionAlertError(dispatch: DispatchInterface, message: string) {
  dispatch(alertError(message));
}

const merchi = new Merchi();

const {
  actionSquarePaymentEnd,
  actionSquarePaymentStart,
} = sliceSquareForm.actions;

export async function actionSquarePaymentProcess(
  dispatch: any,
  cart: any,
  sourceId: string,
  callbackPaymentSuccess: any,
) {
  dispatch(actionSquarePaymentStart());
  let url = `/cart/${cart.id}/square/payment/`;
  const fetchOptions: any = {
    method: 'GET',
    query: [['sourceId', sourceId], ['cart_token', cart.token]],
  };
  try {
    const r = await merchi.authenticatedFetch(url, fetchOptions);
    callbackPaymentSuccess(r.invoice);
    dispatch(actionSquarePaymentEnd());
  } catch(e) {
    actionAlertError(dispatch, e);
    dispatch(actionSquarePaymentEnd());
  }
}
