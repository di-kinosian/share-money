import { useMemo } from 'react';
import { ButtonProps } from 'semantic-ui-react';
import { StyledButton } from './styled';

interface IButtonProps extends ButtonProps {
  variant?: 'primary' | 'negative';
  width?: string;
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
      width={width}
      color={preparedColor}
      negative={variant === 'negative'}
      size="big"
      {...rest}
    />
  );
};

export default Button;
