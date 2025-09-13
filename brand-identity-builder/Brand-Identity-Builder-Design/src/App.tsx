import { useState } from 'react';
import { BrandIdentityBuilder } from './components/BrandIdentityBuilder';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <BrandIdentityBuilder />
    </div>
  );
}