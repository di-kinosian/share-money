import styled from 'styled-components';
import { Button, Form } from 'semantic-ui-react';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Signin = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px 40px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`;

export const StyledFormInput = styled(Form.Input)`
  width: 270px;
  height: 40px;
`;

export const SumbitButton = styled(Button)`
  width: 270px;
  height: 40px;
`;

export const Header = styled.div`
  font-size: 24px;
  margin: 24px;
  font-weight: bold;
`;

export const ActionText = styled.div`
  font-weight: bold;
  cursor: pointer;
`;
