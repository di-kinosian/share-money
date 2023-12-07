import so from 'styled-components';
import { ShadowContainer } from '../../../components/styled';
import Field from '../../../components/Field';
import { Input } from 'semantic-ui-react';

export const TracsactionInput = so(Input)`
    width: 100%;
`;

export const UsersRow = so.div`
    margin-top: 16px;
    display: grid;
    grid-template-columns: 44% 12% 44%;
`;

export const ExchangeBtn = so.div`
    display: flex;
    justify-content: center;
    padding-top: 36px;
    i {
        margin: 0;
    }
`;

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

export const UserName = so.div`
    opacity: 0.9;
    font-weight: 500;
    margin-bottom: 6px;
    margin-right: auto;
`;

export const ButtonsContainer = so.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

export const ErrorText = so.div`
    color: red;
`;

export const UploadButton = so.label`
    cursor: pointer;
    border-radius: 4px;
    background: #e0e1e2 none;
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    width: 41.13px;
    &:hover {
        background-color: rgb(202, 203, 205);
    }
`;

export const UploadInput = so.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

export const FileCard = so.div`
    height: 48px;
    border-radius: 4px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    padding: 8px;
    background: rgba(224, 225, 226, 0.8);
    &:hover {
        background-color: rgb(202, 203, 205);
    }
`;

export const FileImg = so.img`
    width: 32px;
    height: 32px;
    margin-right: 16px;
`;

export const FileName = so.div`
    margin-right: auto;
`;

export const Label = so.span`
    margin-left: 8px;
    font-weight: 600;
    line-height: 16px;
    font-size: 16px;
`;

export const NewTransaction = so(ShadowContainer)`
    margin: 0 16px;
    padding: 8px 16px;
`;

export const NewTransactionRow = so.div`
    padding: 8px 0px;
    height: 40px;
    display: flex;
    align-items: center;
    &:not(:first-child) {
        border-top: 1px solid #e8e8e8;
    }
    i.icons {
        width: 20px;
    }
`;

export const NewTransactionForm = so(ShadowContainer)`
    margin: 0 16px;
    position: relative;
`;

export const UserField = so(Field)`
    flex-grow: 1;
    margin-bottom: 8px;
`;