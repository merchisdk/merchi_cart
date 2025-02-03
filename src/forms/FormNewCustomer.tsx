import * as React from 'react';
import { useForm } from 'react-hook-form';
import InputAcceptUserTermsAndConditions from './InputAcceptUserTermsAndConditions';
import { Button } from '../buttons';
import InputSelect from './InputSelect';
import InputText from './InputText';
import { useCartContext } from '../CartProvider';
import { cartEmbed, phoneOptions } from '../utilities/helpers';
import InputError from './InputError';
import { createNewCustomer, makeUser } from '../utilities/user';
import { makeCart } from '../utilities/cart';
import { getCartCookieToken } from '../utilities/cookie';

export const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;

export function FormCustomerNew() {
  const {
    cart,
    classNameBtnPrimary,
    classNameCartFormGroup,
    classNameCartFormGroupButton,
    domainId,
    setCart,
    setCartClient,
    showUserTermsAndConditions,
  } = useCartContext();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(({} as any));
  const [acceptConditions, setAcceptConditions] = React.useState(true);

  async function actionCreateNewCustomer(customerJson: any) {
    setError({});
    setLoading(true);
    try {
      const r = await createNewCustomer(
        {...customerJson, registeredUnderDomains: [{id: domainId}]}
      );
      const { user } = r;

      // patch cart with new user
      const cartToken = await getCartCookieToken((domainId as number));
      const clientEnt = makeUser({id: user.id});
      const cartEnt = makeCart({...cart}, false, cartToken);
      cartEnt.client = clientEnt;
      const _cart = await cartEnt.save({embed: cartEmbed});
      setCartClient({...user});
      const cartJson = _cart.toJson();
      setCart(cartJson);
    } catch (e: any) {
      setError({message: e.errorMessage || e.message || 'Unable to attach client to cart.'});
    } finally {
      setLoading(false);
    }
  }

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      emailAddresses: [{ emailAddress: '' }],
      name: '',
      phoneNumbers: [{ code: 'AU', number: '' }],
      registeredAsGuest: false,
    },
  });

  async function onSubmit(values: any) {
    await actionCreateNewCustomer({ ...values });
  }

  // Basic validation for phone. Checking that phone is a number. Can make more complex if we want.
  function validatePhone() {
    const phone = watch('phoneNumbers.0.number');
    if (isNaN(phone as any)) return 'Phone number must be a number';
    else return true;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        control={control}
        label='Full Name'
        name='name'
        placeholder='John Smith'
        rules={{ required: 'Full name is required.' }}
      />
      <InputText
        control={control}
        label='Email'
        name='emailAddresses[0].emailAddress'
        placeholder='john@example.com'
        rules={{
          required: 'Email is required.',
          validate: emailValidation,
        }}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flexGrow: 1 }}>
          <InputSelect
            control={control}
            label='Country Code'
            name='phoneNumbers[0].code'
            options={phoneOptions}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <InputText
            control={control}
            label='Phone Number'
            name='phoneNumbers[0].number'
            placeholder='0400 000 000'
            rules={{
              required: 'Phone number is required',
              validate: validatePhone,
            }}
            type='phone'
          />
        </div>
      </div>
      {showUserTermsAndConditions && (
        <div className={classNameCartFormGroup}>
          <InputAcceptUserTermsAndConditions
            isChecked={acceptConditions}
            setIsChecked={setAcceptConditions}
          />
          {!acceptConditions && (
            <InputError
              error={{
                message:
                  'You must agree to the user profile terms and conditions to proceed.',
              }}
            />
          )}
        </div>
      )}
      <InputError error={error || {}} />
      <div className={classNameCartFormGroupButton}>
        <Button
          className={classNameBtnPrimary}
          disabled={loading}
          type='submit'
        >
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default FormCustomerNew;
