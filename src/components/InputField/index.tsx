import { ReactNode } from 'react';
import * as s from './styled';

interface InputFieldProps {
  label?: string;
  errorText?: string;
  children?: ReactNode;
  isRequired?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  errorText,
  isRequired,
  children,
  className,
}) => {
  return (
    <div className={className}>
      <s.FieldText >
        <s.LabelText>{label}</s.LabelText>
        {isRequired ? <s.Required>*</s.Required> : null}
      </s.FieldText>
      {children}
      {errorText ? <s.errorText>{errorText}</s.errorText> : null}
    </div>
  );
};
