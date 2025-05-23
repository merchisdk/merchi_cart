import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import { tabIdPaymentSuccess } from '../utilities/tabs';
import { companyPrimaryAddress } from '../utilities/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonInvoiceDownload } from '../buttons';
import { CartBody, CartTabPanel } from '../components';
import { useCartContext } from '../CartProvider';

function PanelPaymentSuccess() {
  const {
    classNameBtnPrimary,
    customSuccessMessage,
    fetchingCart,
    invoiceJson,
    setCartComplete,
    urlTrackingPage,
  } = useCartContext();
  const { domain, id, unpaid } = invoiceJson;
  const email = domain && domain.company ? companyPrimaryAddress(domain.company) : null;
  return (
    <CartTabPanel tabId={tabIdPaymentSuccess}>
      <CartBody>
        <CheckoutContainer>
          <InnerContainer>
            <h2><FontAwesomeIcon icon={faCheckCircle} /></h2>
            <h3>Order #{id}</h3>
            <h4>Payment Received!</h4>
            {customSuccessMessage ? (
              <p className='merchi-cart-success-message '>
                {customSuccessMessage}
              </p>
            ) : (
              <p className='merchi-cart-success-message '>
                Your order #{id} is being processed and you should
                receive an email from us shortly. If you haven't heard from us within 24
                hours please feel free to contact us{email ? ` at ${email.emailAddress}.` : '.'}
              </p>
            )}
            {!unpaid && <p><ButtonInvoiceDownload /></p>}
            <p>
              <Button
                className={classNameBtnPrimary}
                disabled={fetchingCart}
                onClick={setCartComplete}
              >
                {fetchingCart ? 'Loading...' : 'Done'}
              </Button>
            </p>
          </InnerContainer>
        </CheckoutContainer>
        {urlTrackingPage &&
          <iframe
            style={{height: '1px', left: '0px', width: '1px'}}
            src={urlTrackingPage}
          />
        }
      </CartBody>
    </CartTabPanel>
  );
}

export default PanelPaymentSuccess;
