import * as React from 'react';

interface CheckoutContainerProps {
  children: any;
  textAlign?: any;
}

export function CheckoutContainer(props: CheckoutContainerProps) {
  const { children, textAlign = 'center' } = props;
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

export function InnerContainer(props: InnerProps) {
  const { children, paddingBottom, paddingTop, width = 400 } = props;
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
