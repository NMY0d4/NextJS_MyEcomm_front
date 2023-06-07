import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useState } from 'react';
import { CartContext } from '@/store/CartContext';
// import { CgMenuRound } from 'react-icons/cg';
import BarsIcon from './icons/Bars';

const StyledHeader = styled.header`
  background-color: var(--primaryVeryLight);
  font-weight: bold;
  border-bottom: 1px solid var(--primary);
`;

const Logo = styled(Link)`
  color: var(--primaryDark);
  position: relative;
  z-index: 20;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
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
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>GM_Web Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon className='w-8 h-8' />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
