import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';

const StyledHeader = styled.header`
  background-color: #68d6da;
`;

const Logo = styled(Link)`
  color: #107275;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Logo href={'/'}>GM_Web Ecommerce</Logo>
        <nav>
          <Link href={'/'}>Home</Link>
          <Link href={'/products'}>All products</Link>
          <Link href={'/categories'}>Categories</Link>
          <Link href={'/account'}>Account</Link>
          <Link href={'cart'}>Cart (0)</Link>
        </nav>
      </Center>
    </StyledHeader>
  );
}
