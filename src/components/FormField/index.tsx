import { ReactNode } from 'react';
import * as s from './styled';

interface FormFieldProps {
  label?: string;
  errorText?: string;
  children?: ReactNode;
  isRequired?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
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
