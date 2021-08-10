import Field from '../../components/Field';
import closeIcon from '../../assets/img/close-icon.svg';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';


function TransactionBlock() {
    const usersArray = ['Саша', 'Максим', 'Денис', 'Андрей'];

    return (
        <div className="transaction-block">
            <div className="close-button">
                <img alt="" src={closeIcon} className="close-icon" />
            </div>
            <Field label={'Title'}>
                <input id="title-input" placeholder="Enter title" />
            </Field>

            <div className="user-row">
                {usersArray.map((user) => {
                    return (
                        <div className="user-block">
                            <div className="User">{user}</div>
                            <input type="number" className="user-input"></input>
                                                 
                        </div>
                    );
                })}
            </div>

            <div className="row">
                <Field label={'Date'}>
                    <DateInput
                        placeholder="Date"
                        popupPosition="bottom right"
                        className="example-calendar-input"
                        name="date"
                        closable
                        clearIcon={<Icon name="remove" color="red" />}
                        animation="scale"
                        duration={200}
                        hideMobileKeyboard
                        iconPosition="left"
                        preserveViewMode={false}
                        autoComplete="off"
                    />
                </Field>

                <Field label={'Time'}>
                    <TimeInput
                        placeholder="Time"
                        popupPosition="bottom right"
                        className="example-calendar-input"
                        name="time"
                        animation="horizontal flip"
                        duration={300}
                        closable
                        autoComplete="off"
                        hideMobileKeyboard
                        iconPosition="left"
                    />
                </Field>
            </div>
            <button className="confirmation-button">OK</button>
        </div>
    );
}

export default TransactionBlock;
