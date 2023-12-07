import { ButtonProps } from 'semantic-ui-react';
import { BodyText } from '../styled';
import Modal from '../Modal';
import { formatToLocalDateString } from '../../helpers/format';
import { useModalState } from '../../helpers/hooks';
import { Calendar, Control } from './styled';
import { CalendarIcon } from './icon';

interface IButtonProps extends ButtonProps {
  value: Date;
  onChange: (date: Date) => void
}



const DatePicker: React.FC<IButtonProps> = ({ value, onChange }) => {
  const { isOpen, open, close} = useModalState()


  const onChangeDate = (date: Date) => {
    onChange(date)
    close()
  }

  return (
    <>
      <Control onClick={open}>
        <BodyText>{formatToLocalDateString(value)}</BodyText>
        <CalendarIcon />
      </Control>
      <Modal
        isOpen={isOpen}
        onClose={close}
        zIndex={6}
      >
        <Calendar value={value} onChange={onChangeDate} weekStartsFrom="Monday" />
      </Modal>
    </>

  );
};

export default DatePicker;
