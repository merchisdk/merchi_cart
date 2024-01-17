import sliceStripeAlerts from './sliceStripeAlerts';
import sliceStripeForm from './sliceStripeForm';

const sliceStripeCardForm = {
  stateStripeAlerts: sliceStripeAlerts.reducer,
  stateStripeForm: sliceStripeForm.reducer,
};

export default sliceStripeCardForm;
