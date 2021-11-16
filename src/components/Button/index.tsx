import { useMemo } from 'react';
import { ButtonProps } from 'semantic-ui-react';
import { StyledButton } from './styled';

interface IButtonProps extends ButtonProps {
    variant?: 'primary';
    width?: number;
}

const Button: React.FC<IButtonProps> = ({ width, variant, color, ...rest }) => {
    const preparedColor = useMemo(() => {
        if (variant === 'primary') {
            return 'teal';
        }
        if (color) {
            return color;
        }
    }, [color, variant]);

    return (
        <StyledButton
            size="large"
            width={width}
            color={preparedColor}
            {...rest}
        />
    );
};

export default Button;
