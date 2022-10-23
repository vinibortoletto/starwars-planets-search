import React from 'react';
import starwarsLogo from '../assets/starwars-logo.png';

export default function Logo() {
  return (
    <div className="max-w-md mx-auto mb-10">
      <img
        src={ starwarsLogo }
        alt="starwars logo"
        className="w-2/5 mx-auto m-4"
      />
    </div>
  );
}
