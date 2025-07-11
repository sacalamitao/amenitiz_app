// app/javascript/packs/application.js
import Rails from '@rails/ujs';
import * as ActiveStorage from '@rails/activestorage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Test from '../components/Test';
import Cart from '../components/Cart';

console.log('application.js: Starting initialization');
console.log('React:', typeof React, 'ReactDOM:', typeof ReactDOM);

Rails.start();
ActiveStorage.start();

window.Test = Test;
window.Cart = Cart;

console.log('application.js: Components registered', { Test: window.Test, Cart: window.Cart });

// Debug react_ujs initialization
import * as ReactRailsUJS from 'react_ujs';
console.log('react_ujs loaded:', ReactRailsUJS);

// Manual mounting for Test
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded: Checking for mount points');
  const testRoot = document.getElementById('test-root');
  if (testRoot) {
    console.log('Mounting Test component');
    const rootElement = ReactDOM.createRoot(testRoot);
    rootElement.render(<Test />);
  } else {
    console.log('test-root element not found');
  }
});