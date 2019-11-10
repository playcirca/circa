import React from 'react';
import { StonewallContainer } from './StonewallContainer';

export const Welcome = () => {
  return (
    <StonewallContainer>
      <div>Enter your mobile number to begin</div>
      <form>
        <input type="string" css={{ fontSize: '1.6rem' }} />
        <input type="submit" value="Let's go" />
      </form>
    </StonewallContainer>
  );
};
