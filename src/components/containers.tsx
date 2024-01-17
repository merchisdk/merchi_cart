import * as React from 'react';

interface CheckoutContainerProps {
  children: any;
  textAlign?: any;
}

export function CheckoutContainer({ children, textAlign = 'center' }: CheckoutContainerProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: textAlign,
      }}
    >
      {children}
    </div>
  );
}

interface InnerProps {
  children: any;
  paddingBottom?: string;
  paddingTop?: string;
  width?: number;
}

export function InnerContainer({ children, paddingBottom, paddingTop, width = 400 }: InnerProps) {
  return (
    <div style={{
      padding: '3rem',
      paddingBottom: paddingBottom,
      paddingTop: paddingTop,
      width: width,
    }}>
      {children}
    </div>
  );
}
