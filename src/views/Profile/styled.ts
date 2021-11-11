import styled from 'styled-components';

export const ContainerProfile = styled.div`
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    padding-top: 30px;
	padding: 18px 16px 0px 16px;
    font-size: 20px;
`;

export const RowName = styled.div`
    margin-top: 8px;
`;

export const Text = styled.div`
    opacity: 0.9;
    font-weight: 600;
    margin-bottom: 6px;
`;

export const RowEmail = styled.div``;

export const SaveButton = styled.div`
    background: rgb(105, 226, 212);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    height: 40px;
    width: 80px;
    cursor: pointer;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileInput = styled.input`
    height: 40px;
    width: 100%;
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid rgb(169, 169, 169);
    margin: 0px 0 16px 0;
    box-sizing: border-box;
`;

export const Title = styled.div`
    margin-bottom: 6px;
`;
