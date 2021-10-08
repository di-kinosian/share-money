import styled from 'styled-components';

export const SidebarOverlay = styled.div<{ isOpened: boolean }>`
    position: fixed;
    width: 100vw;
    top: 0;
    height: 100vh;
    background: ${(p) => (p.isOpened ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
    z-index: 100;
    transition: background-color 0.3s ease;
`;

export const SidebarContainer = styled.section<{
    isOpened: boolean;
    width: string;
}>`
    background: #fff;
    width: ${(p) => (p.isOpened ? p.width : 0)};
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    transition: width 0.3s ease;
`;

export const Sidebar = styled.div<{
    width: string;
}>`
    width: ${(p) => p.width};
`;
