import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { Loading } from '@skynet/core';
import LayoutHero from './LayoutHero';
import styled from 'styled-components';
import icon from '../../assets/img/skynet_loading.gif';

type Props = {
  children?: ReactNode;
};

const StyledLogoContainer = styled.div`
  width: 50px;
  img {
    height: 50px;
    margin-bottom: 2rem;
  }
`;

export default function LayoutLoading(props: Props) {
  const { children } = props;

  return (
    <LayoutHero>
      <Typography variant="h6">{children}</Typography>
      {/* <Loading /> */}
      <StyledLogoContainer>
            <img src={icon} />
      </StyledLogoContainer>
    </LayoutHero>
  );
}

LayoutLoading.defaultProps = {
  children: undefined,
};
