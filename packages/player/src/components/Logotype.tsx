import React from 'react';
import { getColorForTick } from '../gradients';
import { useCirca } from '../useCirca';

export const Logotype = () => {
  const [state] = useCirca();
  return (
    <span
      css={{
        fontFamily: 'Comfortaa',
        fontWeight: 700,
        letterSpacing: 4,
        textShadow: '0 3px 5px rgba(0,0,0,0.17)',
        textFillColor: 'transparent',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        backgroundImage: getColorForTick(state.serverTick, 2),
      }}
    >
      circa
    </span>
  );
};
