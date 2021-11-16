import styled from 'styled-components';

export const NewTransactionBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    border-radius: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
`;
export const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
`;

export const CloseIcon = styled.img`
    width: 22px;
    height: 22px;
`;

export const TracsactionField = styled.div`
    flex-grow: 1;
    margin-right: 16px;
`;

export const Text = styled.div`
    opacity: 0.9;
    font-weight: 600;
    margin-bottom: 6px;
`;

export const TracsactionInput = styled.input`
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
`;

export const RowFields = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 16px 0px;
`;

export const AmountInput = styled.input`
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    height: 40px;
    border-radius: 4px;
    padding: 0 6px;
    font-size: 16px;
    border: 1px solid rgb(169, 169, 169);
    width: 100%;
`;

export const PayerInput = styled.input`
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    height: 32px;
    border-radius: 4px;
    padding: 0 6px;
    font-size: 16px;
    border: 1px solid rgb(169, 169, 169);
    width: 30%;
`;

export const UserAmountRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 8px 0px;
`;

export const UserName = styled.div`
    opacity: 0.9;
    font-weight: 500;
    margin-bottom: 6px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

export const ErrorText = styled.div`
    color: red;
`;

export const UploadButton = styled.label`
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

export const UploadInput = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

export const FileCard = styled.div`
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

export const FileImg = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 16px;
`;

export const FileName = styled.div`
    margin-right: auto;
`;
