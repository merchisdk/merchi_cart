import * as React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Merchi } from 'merchi_sdk_ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../CartProvider';
import { actionPatchCart } from '../store';

export default function DiscountInputGroup() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const {
    discountButtonText = 'Apply',
    discountClassName = 'merchi-discount-group-container',
    discountClassNameButton = 'btn btn-primary',
    discountClassNameButtonContainer = 'col-auto',
    discountClassNameButtonItemRemove = 'btn btn-sm btn-link',
    discountClassNameErrorMessage = 'text-danger',
    discountClassNameInput = 'form-control',
    discountClassNameInputContainer,
    discountClassNameInputdiscountLabel = 'visually-hidden',
    discountClassNameListItem = 'list-group-item d-flex align-items-center justify-content-between mt-2',
    discountClassNameListItems = 'list-group',
    discountClassNameMainContainer,
    discountLabel = 'Discount Codes',
    discountShowAppliedItems,
  } = useCartContext();
  const merchi = new Merchi();
  const hookForm = useForm({
    defaultValues: { codes: '' },
  });
  const {
    getValues,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = hookForm;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(({} as any));

  const onSubmit = async (data: { codes: string }) => {
    const validate = await trigger();
    if (validate) {
      await validateCodes(data.codes);
    }
  };

  async function validateCodes(codes: string) {
    const query: Array<any> = [['codes', codes]];
    setLoading(true);
    setError({});
    try {
      let url = `/carts/${cart.id}/check_discount_code/`;
      const r = await merchi.authenticatedFetch(url, { query });
      setItems(r.items || []);
      actionPatchCart({...cart, discountItems: r.items || []});
    } catch (e: any) {
      setError({message: `Error: ${e.errorMessage || e.message || 'Unexpected error.'}`});
      actionPatchCart({...cart, discountItems: []});
    } finally {
      setLoading(false);
    }
  }

  async function handleClick() {
    const { codes } = getValues();
    await onSubmit({ codes });
  }

  const [items, setItems] = React.useState([]);

  async function removeItem(index: number) {
    const item: any = {...(items[index] as any)};
    const codes = getValues('codes');
    const newValues = codes.replace(item.code, "");
    setValue('codes', newValues);
    await validateCodes(newValues);
  }

  return (
    <div className={discountClassNameMainContainer}>
      <div className={discountClassName}>
        <div className={discountClassNameInputContainer}>
          {discountLabel && <label className={discountClassNameInputdiscountLabel}>{discountLabel}</label>}
          <input
            type="text"
            className={discountClassNameInput}
            placeholder='discount20,dicoount10'
            {...register('codes', {required: 'Codes must be provided.'})}
          />
        </div>
        <div className={discountClassNameButtonContainer}>
          <button
            className={discountClassNameButton}
            disabled={loading}
            onClick={handleClick}
          >
            {loading ? (
              <FontAwesomeIcon icon={faCircleNotch} />
            ) : discountButtonText}
          </button>
        </div>
      </div>
      {error.message && (
        <div className={discountClassNameErrorMessage}>
          {error.message}
        </div>
      )}
      {errors.codes && (
        <div className={discountClassNameErrorMessage}>
          {errors.codes.message}
        </div>
      )}
      {discountShowAppliedItems && (
        <div className={discountClassNameListItems}>
          {items.map((item: any, index: number) =>
            <div
              className={discountClassNameListItem}
              key={index}
            >
              <div>{item.code} {item.description}</div>
              <div>
                <button
                  className={discountClassNameButtonItemRemove}
                  onClick={() => removeItem(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
