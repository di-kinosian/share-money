import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import plusIcon from '../assets/img/plus.svg';

const Button = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  background-color: rgb(105,226,212);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;

  img {
    width: 32px;
    height: 32px;
  }
`

export const AddButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Button {...props}><img src={plusIcon} alt=''/></Button>
}
