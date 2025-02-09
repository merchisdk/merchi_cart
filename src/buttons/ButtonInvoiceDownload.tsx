import * as React from 'react';
import { useCartContext } from '../CartProvider';
import { generatePublicInvoicePdf } from '../utilities/invoice';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaFileInvoiceDollar } from 'react-icons/fa';

function ButtonInvoiceDownload() {
  const {
    alertError,
    classNameBtnDownloadInvoice,
    apiUrl,
    invoiceJson
  } = useCartContext();
  const { unpaid } = invoiceJson;
  const [loading, setLoading] = useState(false);
  async function generate(receipt?: boolean) {
    setLoading(true);
    try {
      await generatePublicInvoicePdf((apiUrl as string), invoiceJson, receipt);
      setLoading(false);
    } catch (e: any) {
      alertError(e.message);
      setLoading(false);
    }
  }
  return (
    <>
      {unpaid ? (
        <button
          className={classNameBtnDownloadInvoice}
          disabled={loading}
          onClick={() => generate(false)}
        >
          {loading ? (
            <CgSpinner fontSize='1.1rem' className='animate_spin mr-2' />
          ) : (
            <FaFileInvoiceDollar fontSize='1.1rem' className='mr-2' />
          )}
          Download Invoice
        </button>
      ) : (
        <button
          className={classNameBtnDownloadInvoice}
          disabled={loading}
          onClick={() => generate(true)}
        >
          {loading ? (
            <CgSpinner fontSize='1.1rem' className='animate_spin mr-2' />
          ) : (
            <FaFileInvoiceDollar fontSize='1.1rem' className='mr-2' />
          )}
          Download Receipt
        </button>
      )}
    </>
  );
}

export default ButtonInvoiceDownload;
