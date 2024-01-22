import sliceStripeAlerts from './sliceStripeAlerts';
import sliceStripeForm from './sliceStripeForm';
var sliceStripeCardForm = {
    stateStripeAlerts: sliceStripeAlerts.reducer,
    stateStripeForm: sliceStripeForm.reducer,
};
export default sliceStripeCardForm;
