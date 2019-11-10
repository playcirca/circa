import { keyframes } from "@emotion/core";


export const gradientsType = keyframes(`
  0% {
        background-image: linear-gradient(29deg, #5D13BF 0%, #E21EB0 79%);
  }
  
  50% {
    background-image: linear-gradient(29deg, #1200FF 0%, #13BFA9 80%);
  }
  
  100% {
    background-image: linear-gradient(29deg, #BF1313 0%, #FFB732 79%);
  }
`);

export const gradientsBg = keyframes(`
  0% {background-image: ;

  }
  
  50% {
        background-image: ;

  }
  
  100% {
            background-image: ;

  }
  
`)

const colors = [
  'linear-gradient(29deg, #1200FF 0%, #13BFA9 80%)',
  'linear-gradient(29deg, #BF1313 0%, #FFB732 79%)',
  'linear-gradient(29deg, #5D13BF 0%, #E21EB0 79%)'
];


export const getColorForTick = (tick: number, offset: number = 0) => {
  return colors[(tick + offset) % colors.length];
};
