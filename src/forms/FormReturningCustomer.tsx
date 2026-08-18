import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../buttons';
import InputError from './InputError';
import { useCartContext } from '../CartProvider';
import {
  makeUser,
  tryReturningCustomerEmail,
} from '../utilities/user';
import { makeCart } from '../utilities/cart';
import { getCartCookieToken } from '../utilities/cookie';
import { cartEmbed } from '../utilities/helpers';
import {
  getSavedCheckoutCustomer,
  saveCheckoutCustomer,
} from '../utilities/local_storage';

const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;

function FormReturningCustomer() {
  const {
    alertError,
    cart,
    classNameBtnPrimary,
    classNameCartFormGroup,
    classNameCartFormInput,
    classNameCartFormGroupButton,
    domainId,
    setCart,
    setCartClient,
  } = useCartContext();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(({} as any));
  const savedCustomer = getSavedCheckoutCustomer(domainId);

  const hookForm = useForm({
    defaultValues: { emailAddress: savedCustomer?.emailAddress || '' },
  });
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    register,
  } = hookForm;
  async function submit() {
    setError({});
    const { emailAddress } = getValues();
    setLoading(true);
    try {
      const user: any = await tryReturningCustomerEmail(emailAddress);
      // /user-check-email/ returns user_id (not id)
      const userId = user.user_id ?? user.id;
      if (!userId) {
        throw new Error('Unable to find returning customer.');
      }

      // Attach by id only — extra user fields trigger a forbidden user PATCH.
      const cartToken = await getCartCookieToken((domainId as number));
      const clientEnt = makeUser({id: userId}, true);
      const cartEnt = makeCart({ ...cart, sendWhatsapp: false }, false, cartToken);
      cartEnt.client = clientEnt;
      const _cart = await cartEnt.save({embed: cartEmbed});
      const cartJson = _cart.toJson();
      if (!cartJson?.client?.id) {
        throw new Error('Unable to attach client to cart.');
      }
      saveCheckoutCustomer(domainId, {
        id: userId,
        name: user.name || savedCustomer?.name,
        emailAddress,
      });
      setCartClient(cartJson.client);
      setCart(cartJson);
    } catch(e: any) {
      alertError(e.errorMessage || e.message);
      setError({message: e.errorMessage || e.message || 'Server error.'});
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className={classNameCartFormGroup}>
        <input
          className={classNameCartFormInput}
          placeholder='info@example.com'
          type='email'
          {...register('emailAddress', {
            required: 'Email address required',
            pattern: {
              value: emailValidation,
              message: 'Invalid email address'
            }
          })}
        />
        <small>
          If you are a returning customer please use the same email
          which you used previously.
        </small>
        <InputError error={errors.emailAddress} />
        {error && <InputError error={error} />}
      </div>
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

export default FormReturningCustomer;
