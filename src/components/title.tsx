import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Title({ icon, title }: any) {
  return (
    <div
      style={{
        paddingBottom: '0.5rem',
        paddingTop: '0.5rem',
        textAlign: 'center',
      }}>
      {typeof icon === 'string' ?
        <i className={`${icon} fa-2x`}></i> :
        <FontAwesomeIcon icon={icon} size='2x' />}
      <br />
      <div className='mt-3'>
        <strong>{title}</strong>
      </div>
    </div>
  );
}
