import * as React from 'react';
import { useCartContext } from '../CartProvider';


interface Props {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

function InputAcceptUserTermsAndConditions({ isChecked, setIsChecked }: Props) {
  const {
    classNameCartFormCheckbox,
    classNameCartFormGroupCheckbox,
    classNameCartFormLabelCheckbox,
  } = useCartContext();
  return (
    <div
      onClick={
        () => setIsChecked(!isChecked)
      }
      className={classNameCartFormGroupCheckbox}
    >
      <label className={classNameCartFormLabelCheckbox}>
        <input
          className={classNameCartFormCheckbox}
          defaultChecked={isChecked}
          type='checkbox'
        />
        {' '}
        <span style={{ fontSize: '14px' }} className='text-muted'>
          I agree to the user profile{' '}
          <a
            href='/terms-and-conditions/user/'
            target='_blank'
          >
            terms &amp; conditions
          </a>.
        </span>
      </label>
    </div>
  );
}

export default InputAcceptUserTermsAndConditions;
