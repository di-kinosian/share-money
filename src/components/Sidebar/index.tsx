import { useEffect, useState } from 'react';
import * as s from './styled';

interface IProps {
    width: string;
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<IProps> = ({ isOpen, width, onClose, children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // opening actions;
            setIsMounted(true);
            setTimeout(() => {
                setIsOpened(true);
            }, 30);
        }
        if (!isOpen && isMounted) {
            // closing actions;
            setIsOpened(false);
            setTimeout(() => {
                setIsMounted(false);
            }, 300);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        isMounted && (
            <s.SidebarOverlay isOpened={isOpened} onClick={onClose}>
                <s.SidebarContainer
                    isOpened={isOpened}
                    width={width}
                    onClick={(e) => e.stopPropagation()}
                >
                    <s.Sidebar width={width}>{children}</s.Sidebar>
                </s.SidebarContainer>
            </s.SidebarOverlay>
        )
    );
};

export default Sidebar;
