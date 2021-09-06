import React, { ReactNode } from 'react';
import {
  CircularProgress,
  CircularProgressProps,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import Flex from '../Flex';
import icon from '../../../../assets/img/skynet_loading.gif';


const StyledCircularProgress = styled(CircularProgress)`
  color: ${({ theme }) =>
    theme.palette.type === 'dark' ? 'white' : 'inherit'}; ;
`;

const StyledLogoContainer = styled.div`
  width: 50px;
  img {
    height: 50px;
    margin-bottom: 2rem;
  }
`;

type Props = CircularProgressProps & {
  children?: ReactNode;
  center?: boolean;
};

export default function Loading(props: Props) {
  const { children, center, ...rest } = props;

  if (children) {
    return (
      <Flex flexDirection="column" gap={1} alignItems="center">
        <StyledCircularProgress {...rest} />
        
        <Typography variant="body1" align="center">
          {children}
        </Typography>
      </Flex>
    );
  }

  if (center) {
    return (
      <Flex
        flexDirection="column"
        gap={1}
        alignItems="center"
      >
          <StyledLogoContainer>
            <img src={icon} />
          </StyledLogoContainer>
        {/* <StyledCircularProgress {...rest} /> */}
      </Flex>
    );
  }

  return <StyledCircularProgress {...rest} />;
}

Loading.defaultProps = {
  children: undefined,
  center: false,
};
