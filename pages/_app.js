import Header from '@/components/Header';
import { CartContextProvider } from '@/store/CartContext';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

:root {
  --primary: #11999E;       
  --primaryLight:#68d6da;
  --primaryVeryLight: #aff4f7;
  --primaryDark: #107275;
  --secondary: #31d4ac;
  --secondaryLight: #61f3cf;
  --secondaryDark: #25866e;
  --tertiary: #E4F9F5;
  --gray: #40514E;
  --grayLight:#96ada9;
  --grayDark:#24312f;
  --white: #daf2f3;
  --black: #000;

  --box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

*{  
  box-sizing: border-box;
  margin:0;
}

html {
  background-color: var(--primaryVeryLight);
}

body{
  background-color: var(--primaryVeryLight);
  color: var(--grayDark);
  
  font-size: 1rem;
  h1 {
    margin: 0;    
  } 
}

hr {
  border-color: var(--primaryLight);
}
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Header />
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
