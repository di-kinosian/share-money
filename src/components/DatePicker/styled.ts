import styled from 'styled-components';
import DatePickerNPM from 'sassy-datepicker';
import 'sassy-datepicker/dist/styles.css';

export const Control = styled.div`
  height: 40px;
  border-radius: 4px;
  padding: 0 8px;
  border: 1px solid rgb(169, 169, 169);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Calendar = styled(DatePickerNPM)`
  &.sdp,
  &.stp {
    --theme-color: rgb(105, 226, 212);
    --ring-shadow: none;
  }

  &.sdp {
    width: 100%;
    font-size: 16px;
    padding: 16px;
    height: 383px;
    --outline: none;
    --shadow: none;

    .sassy--select {
      font-size: 16px;
      font-weight: 700;
    }

    .sassy--option {
      &__active {
        font-weight: 700;
      }
    }

    .sdp--square-btn {
      width: 40px;
      height: 40px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .sdp--date-btn__selected {
      font-weight: 700;
    }
  }
`;
