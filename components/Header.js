import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useRef, useState } from 'react';
import { CartContext } from '@/store/CartContext';
import BarsIcon from './icons/Bars';
import Image from 'next/legacy/image';
import gmLogo from '@/public/assets/mesLogos/gmLogo.png';
import SearchIcon from './icons/SearchIcon';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition-duration: 280ms;
  &.slide-in {
    transform: translateX(0%);
  }
  &.slide-out {
    transform: translateX(-100%);
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    position: static;
    padding: 0;
    &.slide-out {
      transform: translateX(0);
    }
  }
`;

const NavLink = styled(Link)`
  text-align: center;
  width: 18%;
  color: var(--primary);
  min-width: 20px;
  padding: 0 0;
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    display: block;
    width: auto;
  }

  position: relative;

  &:after {
    content: '';
    pointer-events: none;
    bottom: -2px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: var(--primaryDark);
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 500ms;
    transition-property: width, left;
  }

  &:hover,
  &:focus {
    color: var(--primaryDark);
    &:after {
      width: 100%;
      left: 0%;
    }
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

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
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
            <Image src={gmLogo} alt='/' width='52' height='44' />
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
          <SideIcons>
            <Link href={'/search'}>
              <SearchIcon />
            </Link>
            <NavButton ref={navButtonRef} onClick={handleShowResponsive}>
              <BarsIcon className='w-8 h-8' />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
