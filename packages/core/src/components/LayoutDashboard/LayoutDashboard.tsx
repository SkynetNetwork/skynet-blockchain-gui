import React, { ReactNode, Suspense } from 'react';
import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';
import { t } from '@lingui/macro';
import { AppBar, Toolbar, Drawer, Divider, Container, IconButton } from '@material-ui/core';
import {
  DarkModeToggle,
  LocaleToggle,
  Flex,
  Logo,
  ToolbarSpacing,
  Loading,
} from '@skynet/core';
import { DashboardTitleTarget } from '../DashboardTitle';
import { useLogout } from '@skynet/api-react';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';

const StyledRoot = styled(Flex)`
  height: 100%;
  // overflow: hidden;
`;

const StyledContainer = styled(Container)`
  padding-top: ${({ theme }) => `${theme.spacing(2)}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`;

const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) =>
    theme.palette.type === 'dark' ? '#424242' : 'white'};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  width: ${({ theme }) => `calc(100% - ${theme.drawer.width})`};
  margin-left: ${({ theme }) => theme.drawer.width};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const StyledDrawer = styled(Drawer)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 2};
  width: ${({ theme }) => theme.drawer.width};
  flex-shrink: 0;

  > div {
    width: ${({ theme }) => theme.drawer.width};
  }
`;

const StyledBody = styled(Flex)`
  min-width: 0;
`;

const StyledBrandWrapper = styled(Flex)`
  height: 64px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  // border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const StyledToolbar = styled(Toolbar)`
  padding-left: 0;
  padding-right: 0;
`;

export type LayoutDashboardProps = {
  children?: ReactNode;
  sidebar?: ReactNode;
  outlet?: boolean;
};

export default function LayoutDashboard(props: LayoutDashboardProps) {
  const { children, sidebar, outlet } = props;

  const navigate = useNavigate();
  const logout = useLogout();

  async function handleLogout() {
    await logout();

    navigate('/');
  }

  return (
    <StyledRoot>
      <Suspense fallback={<Loading center />}>
        {sidebar ? (
          <>
            <StyledAppBar position="fixed" color="transparent" elevation={0}>
              <StyledToolbar>
                <Container maxWidth="lg">
                  <Flex alignItems="center">
                    <DashboardTitleTarget />
                    <Flex flexGrow={1} />
                    <LocaleToggle />
                    <DarkModeToggle />
                  </Flex>
                </Container>
              </StyledToolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent">
              <StyledBrandWrapper>
                <Logo width={2 / 3} />
              </StyledBrandWrapper>
              <Divider />
              {sidebar}
            </StyledDrawer>
          </>
        ): (
          <Toolbar>
            <Container maxWidth="lg">
              <Flex>
                <StyledBrandWrapper>
                  <Logo height={1} />
                </StyledBrandWrapper>
                <Flex flexGrow={1} alignItems="flex-end" gap={1} />
                <LocaleToggle />
                <DarkModeToggle />
                <IconButton color="inherit" onClick={handleLogout} title={t`Log Out`}>
                  <ExitToAppIcon />
                </IconButton>
              </Flex>
            </Container>
          </Toolbar>
        )}

        <StyledBody flexDirection="column" flexGrow={1}>
          <ToolbarSpacing />
          <StyledContainer maxWidth="lg">
            <Flex flexDirection="column" gap={2}>
              <Suspense fallback={<Loading center />}>
                {outlet ? <Outlet /> : children}
              </Suspense>
            </Flex>
          </StyledContainer>
        </StyledBody>
      </Suspense>
    </StyledRoot>
  );
}

LayoutDashboard.defaultProps = {
  children: undefined,
  outlet: false,
};
