import { CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

const overlayShowAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
`;

const overlayHideAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;

export const OverlayStyled = styled.div<{
  isOpeningAnimation: boolean;
  zIndex?: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex || 5};
  background: #444;
  opacity: 0.5;
  animation-name: ${({ isOpeningAnimation }) =>
    isOpeningAnimation ? overlayShowAnimation : overlayHideAnimation};
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export const H4 = styled.h4`
  margin: 0px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

export const H5 = styled.h4`
  margin: 0px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

export const NoteText = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

export const BodyText = styled.span<{ color?: string; size?: string }>`
  font-size: ${(props) => props.size || '16px'};
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const BodyTextHighlight = styled(BodyText)`
  font-weight: 600;
`;

export const HorisontalSeparator = styled.div`
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
`;

export const VerticalSeparator = styled.div`
  border-left: 1px solid #d8d8d8;
`;

type FlexProps = {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  wrap?: CSSProperties['flexWrap'];
  gap?: CSSProperties['gap'];
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
  flex-wrap: ${({ wrap }) => wrap};
`;
