import React from 'react';
import {Logotype} from "./Logotype";
import {gradientsBg} from "../gradients";

export const Welcome = () => {
  return (
    <div css={{ height: '100vh', width: '100vw', animation: `${gradientsBg} 2s linear infinite`, padding: '1rem', textAlign: 'center' }}>
      <div css={{ fontSize: '20vh' }}>
        <Logotype />
      </div>

      <div css={{ background: 'rgba(255, 255, 255, 0.6)', borderRadius: 12, padding: '1rem', maxWidth: 300, margin: '0 auto' }}>

      <div>Enter your mobile number to begin</div>
      <form>
        <input type="string"  css={{ fontSize: '1.6rem' }} />
        <input type="submit" value="Let's go" />
      </form>
      </div>
    </div>
  );
}
