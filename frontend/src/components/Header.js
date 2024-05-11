import React from 'react';

import styled from 'styled-components';

export const headerHeight = 65;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: ${headerHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  margin-left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`

const Header = () => {
  return (
    <HeaderWrapper className='border secondary-background'>
      <Logo className='primary-text'>Finance Tracker</Logo>
    </HeaderWrapper>
  );
};

export default Header;
