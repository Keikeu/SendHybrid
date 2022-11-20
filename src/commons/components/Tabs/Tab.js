import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components";
import Icon from "commons/components/Icon";
import Badge from "commons/components/Badge";

const Box = styled.div`
  padding: 6px 12px;
  margin: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border-radius: var(--border-radius-1);
  cursor: pointer;

  padding: ${({ hasIcon }) => (hasIcon ? "8px" : "6px 12px")};

  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--primary-100);
      background-color: var(--neutral-200);
      pointer-events: none;
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      color: var(--neutral-140);

      &:hover,
      &:focus-visible {
        color: var(--neutral-120);
      }
    `}
`;

const StyledBadge = styled(Badge)`
  margin-left: 6px;
`;

function Tab({ className, isActive = false, label, badge, icon, onClick }) {
  return (
    <Box className={className} isActive={isActive} onClick={onClick} hasIcon={!!icon} tabIndex="0">
      {label && !icon && label}
      {badge && <StyledBadge label={badge} size="small" />}
      {icon && <Icon name={icon} size={16} />}
    </Box>
  );
}

Tab.propTypes = {
  className: T.string,
  isActive: T.bool,
  label: T.string.isRequired,
  badge: T.oneOfType([T.string, T.number]),
  icon: T.string,
  onClick: T.func,
};

export default Tab;
