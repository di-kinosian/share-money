import so from 'styled-components';
import { Input } from 'semantic-ui-react';

export const AmountInput = so(Input)`
    width: 100%;
`;

export const PayerInput = so.input`
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    height: 32px;
    border-radius: 4px;
    padding: 0 6px;
    font-size: 16px;
    border: 1px solid rgb(169, 169, 169);
    width: 86px;
    margin-left: auto;
`;

export const UserAmountRow = so.div`
    display: flex;
    align-items: center;
    padding: 4px 0px;
`;
