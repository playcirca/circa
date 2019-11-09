import React from "react";
import {gradientsType} from "../gradients";


export const Logotype = () => {
  return (
      <span css={{
      fontFamily: 'Comfortaa',
      fontWeight: 700,
      letterSpacing: 4,
      textShadow: '0 3px 5px rgba(0,0,0,0.17)',
      backgroundImage: 'linear-gradient(29deg, #5D13BF 0%, #E21EB0 79%)',
      textFillColor: 'transparent',
      '-webkit-text-fill-color': 'transparent',
      backgroundClip: 'text',
      '-webkit-background-clip': 'text',
      animation: `${gradientsType} 2s linear infinite`,
    }}>
      circa
      </span>
  )
}
