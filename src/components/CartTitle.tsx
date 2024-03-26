import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCartContext } from '../CartProvider';

export default function Title({ icon, title }: any) {
  const {
    classNameCartTitle,
  } = useCartContext();
  return (
    <div className={classNameCartTitle}>
      {typeof icon === 'string' ? (
        <i className={`${icon} fa-2x`}></i>
      ) : (
        <FontAwesomeIcon icon={icon} size='2x' />
      )}
      <br />
      <div style={{ marginTop: '1rem' }}>
        <strong>{title}</strong>
      </div>
    </div>
  );
}
