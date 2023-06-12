import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '@/store/CartContext';
// import { CgMenuRound } from 'react-icons/cg';
import BarsIcon from './icons/Bars';
import Image from 'next/legacy/image';
import gmLogo from '@/public/assets/mesLogos/gmLogo.png';

const StyledHeader = styled.header`
  background-color: var(--primaryVeryLight);
  font-weight: bold;
  border-bottom: 1px solid var(--primary);
  position: sticky;
  z-index: 20;
  top: 0;
`;

const Logo = styled(Link)`
  color: var(--primaryDark);
  position: relative;
  z-index: 20;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
    `
      : `
    display: none;
    `}
  gap: 15px;
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 80px 20px;
  background-color: var(--primaryVeryLight);

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: var(--primaryDark);
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  color: var(--primaryDark);
  cursor: pointer;
  position: relative;
  z-index: 20;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hideMobileNav, setHideMobileNav] = useState(false);
  const navButtonRef = useRef(null);

  const handleShowResponsive = () => {
    if (
      navButtonRef.current &&
      window.getComputedStyle(navButtonRef.current).display !== 'none'
    ) {
      if (showMobileNav) {
        setHideMobileNav(true);
        setTimeout(() => {
          setShowMobileNav(false);
        }, 280);
      } else {
        setShowMobileNav(true);
        setHideMobileNav(false);
      }
    }
  };

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>
            <Image src={gmLogo} alt='/' width='50' height='40' />
          </Logo>
          <StyledNav
            mobileNavActive={showMobileNav}
            className={`${showMobileNav ? 'slide-in' : ''} ${
              hideMobileNav ? 'slide-out' : ''
            }`}
          >
            <NavLink href={'/'} onClick={handleShowResponsive}>
              Home
            </NavLink>
            <NavLink href={'/products'} onClick={handleShowResponsive}>
              All products
            </NavLink>
            <NavLink href={'/categories'} onClick={handleShowResponsive}>
              Categories
            </NavLink>
            <NavLink href={'/account'} onClick={handleShowResponsive}>
              Account
            </NavLink>
            <NavLink href={'/cart'} onClick={handleShowResponsive}>
              Cart ({cartProducts.length})
            </NavLink>
          </StyledNav>
          <NavButton ref={navButtonRef} onClick={handleShowResponsive}>
            <BarsIcon className='w-8 h-8' />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
