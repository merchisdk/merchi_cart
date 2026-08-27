import * as React from 'react';
import { useState } from 'react';
import { BiCheck, BiUser } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import FormNewCustomer from '../forms/FormNewCustomer';
import FormReturningCustomer from '../forms/FormReturningCustomer';
import FormWhatsappCustomer from '../forms/FormWhatsappCustomer';

type CheckoutMethod = 'new' | 'returning' | 'whatsapp';
type SectionIconType = 'user' | 'whatsapp';

interface CustomerCheckoutMethodTabsProps {
  whatsappEnabled?: boolean;
}

function renderSectionIcon(iconType: SectionIconType) {
  if (iconType === 'whatsapp') {
    return (
      <FaWhatsapp className="merchi-customer-checkout-option__icon-svg merchi-customer-checkout-option__icon-svg--whatsapp" />
    );
  }

  return <BiUser className="merchi-customer-checkout-option__icon-svg" />;
}

export default function CustomerCheckoutMethodTabs({
  whatsappEnabled = false,
}: CustomerCheckoutMethodTabsProps) {
  const [activeMethod, setActiveMethod] = useState<CheckoutMethod | null>(null);

  const sections: Array<{
    id: CheckoutMethod;
    label: string;
    iconType: SectionIconType;
    form: React.ReactNode;
  }> = [
    {
      id: 'returning',
      label: 'Returning customer',
      iconType: 'user',
      form: <FormReturningCustomer />,
    },
    {
      id: 'new',
      label: 'New customer',
      iconType: 'user',
      form: <FormNewCustomer />,
    },
  ];

  if (whatsappEnabled) {
    sections.push({
      id: 'whatsapp',
      label: 'WhatsApp checkout',
      iconType: 'whatsapp',
      form: <FormWhatsappCustomer />,
    });
  }

  return (
    <>
      <p className="merchi-customer-checkout__heading">Choose a checkout option</p>
      <div
        className="merchi-customer-checkout-options"
        role="radiogroup"
        aria-label="Choose a checkout option"
      >
        {sections.map((section) => {
          const isSelected = activeMethod === section.id;
          return (
            <div
              key={section.id}
              className={`merchi-customer-checkout-option${isSelected ? ' is-selected' : ''}`}
            >
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-expanded={isSelected}
                className="merchi-customer-checkout-option__header"
                onClick={() => setActiveMethod(section.id)}
              >
                <span className="merchi-customer-checkout-option__title">
                  <span className="merchi-customer-checkout-option__icon">
                    {renderSectionIcon(section.iconType)}
                  </span>
                  <span className="merchi-customer-checkout-option__label">
                    {section.label}
                  </span>
                </span>
                <span className="merchi-customer-checkout-option__checkbox" aria-hidden>
                  {isSelected && <BiCheck />}
                </span>
              </button>
              {isSelected && (
                <div className="merchi-customer-checkout-option__body">
                  {section.form}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
