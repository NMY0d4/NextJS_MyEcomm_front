import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext } from 'react';
import { CartContext } from '@/store/CartContext';

const StyledHeader = styled.header`
  background-color: var(--primaryVeryLight);
  font-weight: bold;
  border-bottom: 1px solid var(--primary);
`;

const Logo = styled(Link)`
  color: var(--primaryDark);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: var(--primaryDark);
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>GM_Web Ecommerce</Logo>
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
