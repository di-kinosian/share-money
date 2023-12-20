import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import plusIcon from '../assets/img/plus.svg';

const Button = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 52px;
  height: 52px;
  min-width: 52px;
  min-height: 52px;
  border-radius: 50%;
  background-color: rgb(105,226,212);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;

  img {
    width: 36px;
    height: 36px;
  }
`

export const AddButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Button {...props}><img src={plusIcon} alt=''/></Button>
}
