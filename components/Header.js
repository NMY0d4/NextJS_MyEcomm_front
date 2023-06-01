import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';

const StyledHeader = styled.header`
  background-color: var(--primaryLight);
  font-weight: bold;
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
            <NavLink href={'cart'}>Cart (0)</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
