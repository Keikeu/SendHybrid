import React from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";

const Box = styled.div`
  height: 100%;
`;

const StyledLink = styled(Link)`
  margin-right: 8px;
  color: var(--neutral-120);
  padding: 4px 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--blue-190);
`;

function App() {
  return (
    <Box>
      <Navigation>
        <StyledLink to="/">Homepage</StyledLink>
        <StyledLink to="/documents">Documents</StyledLink>
        <StyledLink to="/report/39">Report</StyledLink>
        <StyledLink to="/login">Admin login</StyledLink>
        <StyledLink to="/settings">Admin settings</StyledLink>
        <StyledLink to="/404">404</StyledLink>
      </Navigation>
      <Outlet />
    </Box>
  );
}

export default App;
