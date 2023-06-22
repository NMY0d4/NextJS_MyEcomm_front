import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import gmLogo from '@/public/assets/mesLogos/gmLogo.png';

const FooterContainer = styled.footer`
  background-color: var(--grayDark);
  color: var(--white);
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-top: 2rem;
`;

const Logo = styled(Link)`
  color: var(--primaryDark);
  position: relative;
  z-index: 20;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLinks = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterLink = styled.li`
  margin-right: 1.5rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo href={'/'}>
          <Image src={gmLogo} alt='/' width='52' height='44' />
        </Logo>

        <FooterLinks>
          <FooterLink>
            <a
              className='mt-2'
              href='https://my-portefolio-next-js.vercel.app/'
              target='_blank'
            >
              my portefolio GM_Web
            </a>
          </FooterLink>
          <FooterLink>
            <a
              href='https://gm-web-next-js-my-ecom-admin.vercel.app/'
              target='_blank'
            >
              DashBoard admin
            </a>
          </FooterLink>
          {/* <FooterLink>
            <a href='#'>Link 3</a>
          </FooterLink> */}
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
