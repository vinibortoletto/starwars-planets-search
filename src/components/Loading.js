import React from 'react';
import circle from '../assets/circle.png';
import circleReverse from '../assets/circle-reverse.png';
import starwarsLogo from '../assets/starwars-logo.png';

export default function Loading() {
  return (
    <div className="h-screen relative max-w-md mx-auto">
      <img
        src={ circle }
        alt="a line forming a circle"
        className="w-1/2 circle"
      />

      <img
        src={ circleReverse }
        alt="a line forming a circle"
        className="w-3/5 circle-reverse"
      />

      <img
        src={ starwarsLogo }
        alt="starwars logo"
        className="w-2/5 absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
