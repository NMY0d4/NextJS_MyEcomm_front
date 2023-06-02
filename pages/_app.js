import { CartContextProvider } from '@/store/CartContext';
import '@/styles/globals.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

:root {
  --primary: #11999E;       
  --primaryLight:#68d6da;
  --primaryVeryLight: #aff4f7;
  --primaryDark: #107275;
  --secondary: #31d4ac;
  --secondaryLight: #61f3cf;
  --secondaryDark: #2ead8e;
  --tertiary: #E4F9F5;
  --gray: #40514E;
  --grayLight:#96ada9;
  --grayDark:#24312f;
  --white: #fff;
  --black: #000;
}

*{
  box-sizing: border-box;
}

body{
  background-color: var(--primaryVeryLight);
  color: var(--grayDark);
  
  font-size: 1rem;
  h1 {
    margin: 0;    
  } 
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
