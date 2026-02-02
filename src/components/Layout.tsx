import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hex</h1>
      <hr></hr>
      {children}
    </div>
  );
}