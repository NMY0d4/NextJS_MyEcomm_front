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

// This application is a fictional project developed for portfolio purposes, showcasing various functionalities that can be implemented in an Ecommerce website. It is important to note that certain features typically present in a real website, such as cookie consent, terms and conditions, and legal notices, have intentionally been excluded for the sake of simplicity. In a real-world scenario, these elements would be essential and would require thorough consideration and implementation, along with other important aspects like SEO optimization and validation schemes.

// One specific feature that is worth mentioning is the integration of Stripe payment gateway. In this demonstration, the validation process for Stripe is set to test mode, allowing users to simulate transactions using dummy data. When testing the payment functionality, you can enter the card number as "42" along with other fictitious details. It is important to understand that this is only for demonstration purposes and should not be used for real transactions.

// While this application provides a comprehensive overview of various features that can be implemented in an Ecommerce site, it is essential to remember that in a real-world scenario, additional considerations and configurations would be necessary. These may include security measures, performance optimization, scalability, and compliance with legal requirements.

// Overall, this application serves as a showcase for the capabilities and potential of an Ecommerce website, providing insights into the different functionalities that can be integrated. However, it is important to adapt and tailor these features to the specific needs and requirements of a real Ecommerce project, ensuring the inclusion of essential elements and adhering to industry best practices.