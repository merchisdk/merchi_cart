import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import { tabIdPaymentSuccess } from '../slices/sliceCart';
import {
  doCartComplete,
  generateInvoicePdf,
  generateInvoiceReceiptPdf,
} from '../store';
import ButtonInvoiceDownload from '../../public_invoice/buttons/ButtonInvoiceDownload';
import { publicUrlFor } from '../../url_map';
import { companyPrimaryAddress } from '../../ts_helpers/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, ModalBody, TabPane } from 'reactstrap';

interface Props {
  customSuccessMessage?: string;
}

function PanelPaymentSuccess(props: Props) {
  const { customSuccessMessage } = props;
  const {
    cartCompleteLoading,
    invoice,
  } = useSelector((s: any) => s.cartPaymentState);
  const { domain, id, unpaid } = invoice;
  const iframeSrc = domain ?
    publicUrlFor(
      'invoice_paid_public',
      {id: domain ? domain.id : 0,
        invoice_id: id ? id : 0}
    ) : '#';
  const email = domain && domain.company ?
    companyPrimaryAddress(domain.company) : null;
  return (
    <TabPane tabId={tabIdPaymentSuccess}>
      <ModalBody className='text-center'>
        <CheckoutContainer>
          <InnerContainer>
            <h2><FontAwesomeIcon icon={faCheckCircle} /></h2>
            <h3>Order #{id}</h3>
            <h4>Payment Received!</h4>
            {customSuccessMessage ?
              <p className='f-s-16 m-t-40 m-b-40'>
                {customSuccessMessage}
              </p> :
              <p className='f-s-16 m-t-40 m-b-40'>
                Your order #{id} is being processed and you should
                receive an email from us shortly. If you haven't heard from us within 24
                hours please feel free to contact us{email ? ` at ${email.emailAddress}.` : '.'}
              </p>
            }
            {!unpaid &&
              <p>
                <ButtonInvoiceDownload
                  invoice={invoice}
                  generateInvoicePdf={generateInvoicePdf}
                  generateInvoiceReceiptPdf={generateInvoiceReceiptPdf}
                />
              </p>
            }
            <p>
              <Button
                size='lg'
                color='primary'
                className='m-t-20'
                disabled={cartCompleteLoading}
                onClick={doCartComplete}
              >
                {cartCompleteLoading ? 'Loading...' : 'Done'}
              </Button>
            </p>
          </InnerContainer>
        </CheckoutContainer>
        <iframe
          style={{height: '1px', left: '0px', width: '1px'}}
          src={iframeSrc}
        ></iframe>
      </ModalBody>
    </TabPane>
  );
}

export default PanelPaymentSuccess;
