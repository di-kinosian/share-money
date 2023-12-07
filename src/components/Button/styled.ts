import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
    width: ${({ width }) => width};
    &.ui.button {
        margin: 0;
    }
`;
